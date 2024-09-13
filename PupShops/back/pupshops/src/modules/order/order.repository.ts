import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "./entities/order.entity";
import { Repository } from "typeorm";
import { OrderDetails } from "./entities/order-detail.entity";
import { User } from "../users/entities/user.entity";
import { Products } from "../products/entities/product.entity";

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Orders)
        private readonly ordersRepository: Repository<Orders>,
        @InjectRepository(OrderDetails)
        private readonly orderDetailRepository: Repository<OrderDetails>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Products)
        private readonly productsRepository: Repository<Products>,
    ) {}

    async addOrder(userId: string, products: any) {
        let total = 0;

        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) throw new NotFoundException(`Usuario con id ${userId} no encontrado`);

        const order = new Orders();
        order.date = new Date();
        order.user = user;

        const newOrder = await this.ordersRepository.save(order);

        const productsArray = await Promise.all(
            products.map(async (element) => {
                const product = await this.productsRepository.findOneBy({
                    id: element.id,
                });

                if (!product) throw new NotFoundException(`Producto con id ${element.id} no encontrado`);

                total += Number(product.price);

                await this.productsRepository.update(
                    { id: element.id },
                    { stock: product.stock - 1 },
                );

                return product;
            }),
        );

        const orderDetail = new OrderDetails();
        orderDetail.price = Number(total.toFixed(2));
        orderDetail.products = productsArray;
        orderDetail.order = newOrder;

        await this.orderDetailRepository.save(orderDetail);


        return await this.orderDetailRepository.find({
            where: { id: orderDetail.id },
            relations: {
                order: true, 
                products: true, 
            },
        });
    }

    async getOrder(id: string) {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: {
                orderDetails: true,
                user: true, 
            },
        });

        if (!order) throw new NotFoundException(`Order con id ${id} no encontrada`);

        return order;
    }
}