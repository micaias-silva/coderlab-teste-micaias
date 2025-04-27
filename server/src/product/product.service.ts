import { BadRequestException, Injectable } from '@nestjs/common';
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
      include: {categories: {include: {category: {include: {parent: true}}}}}
    });

    return createdProduct
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: string): any {
    return {}
  }

  update(id: string, updateProductDto: UpdateProductDto): any {
    return {}
  }

  remove(id: string): any {
    return {}
  }
}
