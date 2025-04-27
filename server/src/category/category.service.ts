import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CategoryService {
  constructor(private databaseService: DatabaseService) {}
  async findAll() {
    return await this.databaseService.category.findMany({
      include: { parent: true },
    });
  }

  async findAllOfManyCategories(categories: string[]) {
    const foundCategories = await this.databaseService.category.findMany({
      where: { name: { in: categories, mode: 'insensitive' } },
    });

    const foundMatchesRequested: boolean =
      foundCategories.length == categories.length &&
      foundCategories.every((item) => categories.includes(item.name));
    if (!foundMatchesRequested) {
      throw new NotFoundException('Some of requested categries were not found');
    }

    return foundCategories;
  }
}
