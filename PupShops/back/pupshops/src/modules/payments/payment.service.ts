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
  private readonly mercadoPagoUrl = 'https://api.mercadopago.com/v1/payments';
  private readonly mercadoPagoPreferenceUrl =
    'https://api.mercadopago.com/checkout/preferences';
  private readonly accessToken: string;

  constructor(
    private configService: ConfigService,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    private readonly mailPaymentService: MailPaymentsService,
  ) {
    this.accessToken = this.configService.get<string>(
      'MERCADO_PAGO_ACCESS_TOKEN',
    );
  }

  //private readonly baseUrl = 'https://pupshops-backend.onrender.com';
  private readonly baseUrl = 'https://24da-190-17-115-142.ngrok-free.app';

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
    const { type, title, quantity, unit_price, orderId } = createPaymentDto;

    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
    });
    if (!order) {
      throw new NotFoundException('Orden de compra no encontrada');
    }

    const preference = {
      items: [
        {
          title: 'Pupshops',
          quantity: quantity,
          currency_id: 'ARS',
          unit_price: unit_price,
          id: type === 'service' ? 'service_1234' : 'product_1234',
        },
      ],
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
        throw new Error('Error en la creación de la preferencia');
      }

      const data = await response.json();

      return { init_point: data.init_point };
    } catch (error) {
      console.error(
        'Error en la solicitud HTTP:',
        error.response?.data || error.message,
      );
      throw new Error(
        'Error en la solicitud: ' + (error.response?.status || 'Unknown error'),
      );
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

    if (!paymentResponse || !paymentResponse.id) {
      throw new Error('No se encontró el pago con el ID proporcionado');
    }

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

      const productsInfo = order.orderDetails.products
        .map((product) => {
          const price =
            typeof product.price === 'number'
              ? product.price.toFixed(2)
              : 'N/A';
          return `
                          Producto: ${product.description || 'Descripción no disponible'}
                          Precio: ${price} 
                          Cantidad: ${order.orderDetails.quantity}`;
        })
        .join('\n--------------------\n');

      const totalPaid = order.orderDetails.products.reduce(
        (total, product) => total + product.price * order.orderDetails.quantity,
        0,
      );

      const emailBody = `
                          ==========================================
                                  ¡Tu pago fue procesado exitosamente!
                          ==========================================

                          Detalles del pedido:
                          --------------------

                          ${productsInfo}

                          --------------------
                          Monto total pagado: $${totalPaid.toFixed(2)}
                          --------------------

                          Orden ID: ${orderId}

                          ==========================================
                                Gracias por tu compra.
                          ==========================================

                          Saludos cordiales,
                          El equipo de PupShops
                          `;

      await this.mailPaymentService.sendMail(
        userEmail,
        'Pago exitoso - PupShops',
        emailBody, // Cuerpo del correo con productos y total formateado
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
