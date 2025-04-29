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
    const nonDuplicatedCategories = [...new Set(categories)];

    const foundCategories = await this.databaseService.category.findMany({
      where: { name: { in: nonDuplicatedCategories, mode: 'insensitive' } },
    });

    const foundMatchesRequested: boolean =
      foundCategories.length == nonDuplicatedCategories.length &&
      foundCategories.every((item) =>
        nonDuplicatedCategories.includes(item.name),
      );
    if (!foundMatchesRequested) {
      throw new NotFoundException(
        'Some of requested categories were not found',
      );
    }

    return foundCategories;
  }
}
