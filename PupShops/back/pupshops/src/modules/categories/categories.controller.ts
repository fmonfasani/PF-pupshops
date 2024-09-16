import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  /*
    @Get('seeder')
    addCategories(){
        return this.categoriesService.addCategories()
    }
    */

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }
}
