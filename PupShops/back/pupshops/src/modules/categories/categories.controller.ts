import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('seeder')
  addCategories() {
    return this.categoriesService.addCategories();
  }

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get('parents')
  getParentCategories() {
    return this.categoriesService.getParentCategories();
  }

  @Get('children/:parentId')
  getChildCategories(@Param('parentId') parentId: string) {
    return this.categoriesService.getChildCategories(parentId);
  }
}