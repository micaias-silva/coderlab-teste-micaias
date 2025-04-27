import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

    const createdProduct = this.databaseService.product.create({
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

  async findAll() {
    return await this.databaseService.product.findMany();
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
        categories: categoriesWillUpdate ? {create: newCategories} : undefined
      },
      include: {categories: {include: {category: true}}}
    });

    return updatedProduct
  }

  remove(id: string): any {
    return {};
  }
}
