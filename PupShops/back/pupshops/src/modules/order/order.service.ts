
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { OrdersRepository } from './order.repository';
import { CuponService } from '../cupones/cupones.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Orders } from './entities/order.entity';
import { Products } from '../products/entities/product.entity';
import { OrderDetails } from './entities/order-detail.entity';

@Injectable()
export class OrderService {

  constructor(
    private readonly orderRepository: OrdersRepository,
    private readonly cuponService: CuponService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Orders)
    private readonly ordersRepository:Repository<Orders>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailRepository: Repository<OrderDetails>
  )
  
   {}

  async create(
    userId: string,
    products: Array<{ id: string; quantity: number }>,
    couponCode?: string 
  ) {

    let total = 0;
    
  
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException(`Usuario con id ${userId} no encontrado`);

    const order = new Orders();
    order.date = new Date();
    order.user = user;
    const newOrder = await this.ordersRepository.save(order);

    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productsRepository.findOneBy({ id: element.id });
        if (!product) throw new NotFoundException(`Producto con id ${element.id} no encontrado`);
        total += Number(product.price) * element.quantity;

        await this.productsRepository.update(
          { id: element.id },
          { stock: product.stock - element.quantity },
        );

        return { product, quantity: element.quantity };
      }),
    );

    
    let discount = 0;
    if (couponCode) {
      try {
        discount = await this.cuponService.applyCoupon(couponCode, total, userId);
        total -= discount;
      } catch (error) {
        
        throw new BadRequestException(`Error aplicando el cupón: ${error.message}`);
      }
    }

    
    const orderDetail = new OrderDetails();
    orderDetail.price = Number(total.toFixed(2));
    orderDetail.products = productsArray.map(item => item.product);
    orderDetail.quantity = productsArray.reduce((acc, item) => acc + item.quantity, 0);  
    orderDetail.order = newOrder;

    await this.orderDetailRepository.save(orderDetail);

    return {
      order: await this.orderDetailRepository.find({
        where: { id: orderDetail.id },
        relations: { order: true, products: true },
      }),
      discountApplied: discount, 
      finalTotal: total,
    };
  }

  async updateTrackingInternal(id: string) {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order no encontrada');
  
      const newLocation = {
      location: this.getRandomLocation(),
      date: new Date(),
    };
  
    if (!order.trackingHistory) {
      order.trackingHistory = [];
    }
  
    order.trackingHistory.push(newLocation);
    await this.ordersRepository.save(order);
  
    return order.trackingHistory;
  }
  
  private getRandomLocation(): string {
    const locations = [
      'Centro de Distribución A',
      'Depósito Regional B',
      'Oficina Postal C',
      'En camino a destino',
    ];
    return locations[Math.floor(Math.random() * locations.length)];

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
