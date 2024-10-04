import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/order.entity';
import { OrderDetails } from './entities/order-detail.entity';
import { Products } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { OrdersRepository } from './order.repository'; 
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Cupon } from '../cupones/cupones.entity';
import { CuponService } from '../cupones/cupones.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, OrderDetails, Products, User,Cupon]),
  ],
  providers: [OrdersRepository, OrderService,CuponService], 
  controllers: [OrderController],
})
export class OrderModule {}
