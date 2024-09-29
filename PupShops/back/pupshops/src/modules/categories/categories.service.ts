import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  getCategories() {
    return this.categoriesRepository.getCategories();
  }

  addCategories() {
    return this.categoriesRepository.addCategories();
  }

  getParentCategories() {
    return this.categoriesRepository.getParentCategories();
  }

  getChildCategories(parentId: string) {
    return this.categoriesRepository.getChildCategories(parentId);
  }
}