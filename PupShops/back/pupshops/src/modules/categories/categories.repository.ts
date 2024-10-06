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

  async addCategory(name, parentName){

    let parentCategory = null;

    if(parentName){
      parentCategory = await this.categoriesRepository.findOne({
       where: { name: parentName },
     });
    }

    let parentId = null;
    if (parentCategory) {
      parentId = parentCategory.id;
    }
    
    let gatosCategoria = await this.categoriesRepository.findOne({
      where: { name: name },
    });

    if (!gatosCategoria) {
      gatosCategoria = this.categoriesRepository.create({
        name: name,
        parent: parentId,
      });
      gatosCategoria = await this.categoriesRepository.save(gatosCategoria);
  }

  return gatosCategoria;



  }

  async addCategories() {

    for (const element of data.default.default) {
      await this.addCategory(element.name, element.parentName);
  }
    return 'Categorías Agregadas';
  }

  async getParentCategories() {
    return await this.categoriesRepository.find({
      where: { parent: null },
    });
  }

  async getChildCategories(parentId: string) {
    return await this.categoriesRepository.find({
      where: { parent: { id: parentId } },
    });
  }
}
