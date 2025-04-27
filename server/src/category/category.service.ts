import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CategoryService {
    constructor(private databaseService: DatabaseService) {}
    async findAll() {
        return await this.databaseService.category.findMany()
    }
}

