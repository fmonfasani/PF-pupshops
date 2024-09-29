import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './categories.entity';
import { Repository } from 'typeorm';
import * as data from '../../utils/categories.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getCategories() {
    return await this.categoriesRepository.find();
  }

  async addCategories() {
    data.default.default.forEach(async (element) => {

      const parentCategory = await this.categoriesRepository.findOne({
        where: { name : element.parentName}
      })
      
      let parentId = null

      if(parentCategory){
        parentId = parentCategory.id
        
      }


      await this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values({
          name: element.name,
          parent: parentId,
        })
        .orIgnore()
        .execute();
    });
    return 'Categorías Agregadas';
  }

  async getParentCategories() {
    return await this.categoriesRepository.find({
      where: { parent: null },
    });
  }

  async getChildCategories(parentId: string) {
    console.log(parentId);
        
    return  await this.categoriesRepository.find({
      where: { parent: { id: parentId } },
    });
    
  }
}
