import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/order.entity';
import { OrderDetails } from './entities/order-detail.entity';
import { Products } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { OrdersRepository } from './order.repository'; 
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, OrderDetails, Products, User]),
  ],
  providers: [OrdersRepository, OrderService], 
  controllers: [OrderController],
})
export class OrderModule {}
