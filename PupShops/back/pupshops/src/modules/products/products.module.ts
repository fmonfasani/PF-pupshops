import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { CategoriesRepository } from '../categories/categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { Categories } from '../categories/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, CategoriesRepository],
})
export class ProductsModule {}
