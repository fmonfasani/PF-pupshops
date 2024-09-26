import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrdersRepository) {}

  async create(userId: string, products: Array<{ id: string, quantity: number }>) {
    return await this.orderRepository.addOrder(userId, products);
  }

  async findAll() {
    return await this.orderRepository.getAllOrders();
  }

  async findOne(id: string) {
    return await this.orderRepository.getOrder(id);
  }

  async update(id: string, updateOrderDto: any) {
    return await this.orderRepository.updateOrder(id, updateOrderDto);
  }

  async remove(id: string) {
    return await this.orderRepository.removeOrder(id);
  }
}
