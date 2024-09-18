import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './categories.entity';
import { Repository } from 'typeorm';
import * as data from '../../utils/archivo.json'

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getCategories() {
    return await this.categoriesRepository.find();
  }

  
    async addCategories(){

      
        data['default'].map(async (element)=>{
            await this.categoriesRepository

            .createQueryBuilder()
            .insert()
            .into(Categories)
            .values({name: element.category})
            .orIgnore()
            .execute();
        });
        return 'Categorias Agregadas'
    }
    
}
