import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Orders } from '../../modules/order/entities/order.entity';
import * as nodemailer from 'nodemailer';
import { MailPaymentsService } from './mailpayments.service';
@Injectable()
export class PaymentsService {
  private readonly mercadoPagoPreferenceUrl =
    'https://api.mercadopago.com/checkout/preferences';
  private readonly accessToken: string;

  constructor(
    private configService: ConfigService,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    private readonly mailPaymentsService: MailPaymentsService,
  ) {
    this.accessToken = this.configService.get<string>(
      'MERCADO_PAGO_ACCESS_TOKEN',
    );
  }
  //private readonly baseUrl = 'https://pupshops-backend.onrender.com';
  private readonly baseUrl = 'https://3d91-190-17-115-142.ngrok-free.app';

  private async httpRequest(url: string, options: any) {
    try {
      if (!options.headers) {
        options.headers = {};
      }
      options.headers['Authorization'] = `Bearer ${this.accessToken}`;

      const response = await fetch(url, options);
      if (!response.ok) {
        const errorResponse = await response.text();
        console.error('Error en la respuesta de la API:', {
          status: response.status,
          statusText: response.statusText,
          errorResponse,
        });
        throw new Error(
          `Error en la solicitud: ${response.statusText}, Response: ${errorResponse}`,
        );
      }
      return await response.json();
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error.message || error);
      throw error;
    }
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {
    console.log('Creando el pago con los siguientes datos:', createPaymentDto);
    const { orderId, title, quantity, unit_price } = createPaymentDto;

    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['orderDetails', 'orderDetails.products', 'user'],
    });

    if (!order) {
      throw new NotFoundException('Orden de compra no encontrada');
    }

    const items = order.orderDetails.products.map((product) => ({
      title: title || product.name,
      quantity: quantity || 1,
      unit_price: unit_price || Number(product.price),
      currency_id: 'ARS',
    }));

    const preference = {
      items,
      external_reference: orderId,
      back_urls: {
        success: `${this.baseUrl}/payments/success`,
        failure: `${this.baseUrl}/payments/failure`,
        pending: `${this.baseUrl}/payments/pending`,
      },
      notification_url: `${this.baseUrl}/payments/webhook`,
      auto_return: 'approved',
      payment_methods: {
        installments: 6,
        excluded_payment_methods: [{ id: 'visa' }],
      },
      metadata: {
        integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
      },
    };

    try {
      const response = await fetch(this.mercadoPagoPreferenceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify(preference),
      });

      if (!response.ok) {
        throw new Error('Error en la creación de la preferencia de pago');
      }

      const data = await response.json();

      return { init_point: data.init_point };
    } catch (error) {
      console.error(
        'Error en la creación de la preferencia de pago:',
        error.message,
      );
      throw new Error('Error en la creación de la preferencia de pago');
    }
  }

  async getPaymentStatus(paymentId: string) {
    const url = `https://api.mercadopago.com/v1/payments/${paymentId}`;

    console.log('Obteniendo estado del pago para ID:', paymentId);

    const paymentResponse = await this.httpRequest(url, { method: 'GET' });

    if (!paymentResponse || !paymentResponse.id) {
      throw new Error('Respuesta inválida: no se encontró el ID del pago');
    }
    return paymentResponse;
  }
  async processPaymentNotification(paymentId: string) {
    console.log('Procesando notificación de pago para ID:', paymentId);
    const paymentResponse = await this.getPaymentStatus(paymentId);
    const orderId = paymentResponse.external_reference;
    const status = paymentResponse.status;

    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['payments', 'user', 'orderDetails', 'orderDetails.products'],
    });

    if (!order) {
      throw new Error('Orden no encontrada');
    }

    if (status === 'approved') {
      order.status = 'paid';

      const userEmail = order.user.email;
      const paymentLink =
        paymentResponse.transaction_details.external_resource_url;

      const productsInfo = order.orderDetails.products
        .map((product) => {
          return `Producto: ${product.description}, Precio: ${product.price}, Cantidad: ${order.orderDetails.quantity}`;
        })
        .join('\n');

      const totalPaid = order.orderDetails.products.reduce(
        (total, product) => total + product.price * order.orderDetails.quantity,
        0,
      );

      await this.mailPaymentsService.sendMail(
        userEmail,
        'Pago exitoso - PupShops',
        `¡Tu pago fue procesado exitosamente!\n\nDetalles del pedido:\n${productsInfo}\nMonto total pagado: ${totalPaid}\nOrden ID: ${orderId}\nGracias por tu compra.\n\nSaludos,\nEl equipo de PupShops`, // Cuerpo del correo con productos y total
      );
    } else if (status === 'rejected') {
      order.status = 'payment_failed';
    }

    const payment = new Payment();
    payment.id = paymentResponse.id;
    payment.status = paymentResponse.status;
    payment.transactionAmount = paymentResponse.transaction_amount;
    payment.order = order;

    await this.ordersRepository.save(order);
    await this.paymentRepository.save(payment);

    return paymentResponse;
  }

  async getOrderInfo(resource: string) {
    try {
      const orderResponse = await this.httpRequest(resource, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      if (!orderResponse || !orderResponse.id) {
        throw new Error('Respuesta inválida: no se encontró el ID de la orden');
      }

      return orderResponse;
    } catch (error) {
      console.error(
        'Error al obtener la información de la orden:',
        error.message,
      );
      throw error;
    }
  }
}
