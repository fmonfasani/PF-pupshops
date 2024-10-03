import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async create(
    userId: string,
    products: Array<{ id: string; quantity: number }>,
  ) {
    const order = await this.ordersRepository.addOrder(userId, products);
    return { orderId: order.orderId };
  }

  async findAll() {
    return await this.ordersRepository.getAllOrders();
  }

  async findOne(id: string) {
    const order = await this.ordersRepository.getOrder(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async update(id: string, updateOrderDto: any) {
    return await this.ordersRepository.updateOrder(id, updateOrderDto);
  }

  async remove(id: string) {
    return await this.ordersRepository.removeOrder(id);
  }
}
