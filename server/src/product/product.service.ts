import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService } from 'src/database/database.service';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    private databaseService: DatabaseService,
    private categoryService: CategoryService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const incomingCategories = createProductDto.categories;
    const matchCategories =
      await this.categoryService.findAllOfManyCategories(incomingCategories);

    const createdProduct = await this.databaseService.product.create({
      data: {
        ...createProductDto,
        categories: {
          create: matchCategories.map((item) => {
            return { categoryId: item.id };
          }),
        },
      },
      include: {
        categories: { include: { category: { include: { parent: true } } } },
      },
    });

    return createdProduct;
  }
  async findAll(page: number, itemCount: number) {
    const productsCount = await this.databaseService.product.count();

    const pageCount = Math.ceil(productsCount / itemCount);

    page = Math.max(1, Math.min(page, pageCount))
    
    const skip = (page - 1) * itemCount

    const navigation = await this.databaseService.product.findMany({
      skip: skip,
      take: itemCount,
    });

    const nextPage = page < pageCount ? page + 1 : null
    const previousPage = page - 1 > 0 ? page -1 : null


    return { currentPage: page,
      previousPage,
      nextPage,
      items: navigation.length,
      navigation,
      pageCount
     };
  }

  async findOne(id: string) {
    const product = await this.databaseService.product.findFirst({
      where: { id },
      include: {
        categories: { include: { category: { include: { parent: true } } } },
      },
    });

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.findOne(id);
    const upcomingCategories = updateProductDto.categories || null;
    const categoriesWillUpdate = upcomingCategories != null;
    let newCategories: { categoryId: string }[] = [];

    if (categoriesWillUpdate) {
      const matchCategories =
        await this.categoryService.findAllOfManyCategories(upcomingCategories);

      await this.databaseService.productInCategory.deleteMany({
        where: { productId: productToUpdate.id },
      });

      newCategories = matchCategories.map((item) => {
        return { categoryId: item.id };
      });
    }

    const updatedProduct = await this.databaseService.product.update({
      where: { id },
      data: {
        ...updateProductDto,
        categories: categoriesWillUpdate
          ? { create: newCategories }
          : undefined,
      },
      include: { categories: { include: { category: true } } },
    });

    return updatedProduct;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.databaseService.product.delete({ where: { id } });
  }
}
