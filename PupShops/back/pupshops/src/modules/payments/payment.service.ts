import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Orders } from '../../modules/order/entities/order.entity';
import { MailPaymentService } from './mailpayment.service';

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
    private readonly mailPaymentService: MailPaymentService,
  ) {
    this.accessToken = this.configService.get<string>(
      'MERCADO_PAGO_ACCESS_TOKEN',
    );
  }

  private readonly baseUrl = 'https://pupshops-backend.onrender.com';
  private readonly basengrokUrl = 'https://b4cf-201-231-240-116.ngrok-free.app';

  private async httpRequest(url: string, options: any) {
    try {
      if (!options.headers) {
        options.headers = {};
      }

      options.headers['Authorization'] = `Bearer ${this.accessToken}`;

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorResponse = await response.text();
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

  async getPaymentsByUser(userId: string): Promise<Payment[]> {
    const orders = await this.ordersRepository.find({
      where: { user: { id: userId } },
      relations: ['payments'],
    });

    if (!orders.length) {
      throw new NotFoundException(
        `No se encontraron órdenes para el usuario con ID ${userId}`,
      );
    }

    const payments = orders.reduce((acc, order) => {
      return acc.concat(order.payments);
    }, []);

    if (!payments.length) {
      throw new NotFoundException(
        `No se encontraron pagos para el usuario con ID ${userId}`,
      );
    }

    return payments;
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
          title: title,
          quantity: quantity,
          currency_id: 'ARS',
          unit_price: unit_price,
          id: type === 'service' ? 'service_1234' : 'product_1234',
          imgUrl: 'https://via.placeholder.com/150',
          description: 'pelota para perro',
        },
      ],
      external_reference: orderId,
      back_urls: {
        success: `${this.baseUrl}/payments/success`,
        failure: `${this.baseUrl}/payments/failure`,
        pending: `${this.baseUrl}/payments/pending`,
      },
      notification_url: `${this.basengrokUrl}/payments/webhook`,
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

      return {
        init_point: data.init_point,
      };
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

  async processPaymentNotification(paymentId: string) {
    const paymentResponse = await this.getPaymentStatus(paymentId);

    if (!paymentResponse || !paymentResponse.id) {
      throw new Error('No se encontró el pago con el ID proporcionado');
    }

    const orderId = paymentResponse.external_reference;
    const status = paymentResponse.status;
    const transactionAmount = paymentResponse.transaction_amount;

    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['user', 'payments'],
    });

    if (!order) {
      throw new Error('Orden no encontrada');
    }

    if (!order.user) {
      throw new Error('No se encontró un usuario asociado a la orden');
    }

    if (status === 'approved') {
      order.status = 'paid';

      const userEmail = order.user.email;
      if (userEmail) {
        await this.mailPaymentService.sendMail(
          userEmail,
          'Confirmación de pago',
          `Tu pago por la orden ${orderId} ha sido aprobado. Monto: ${transactionAmount}.`,
        );
      } else {
        console.error(
          'No se encontró el email del usuario asociado a la orden',
        );
      }
    } else if (status === 'rejected') {
      order.status = 'payment_failed';

      const userEmail = order.user.email;
      if (userEmail) {
        await this.mailPaymentService.sendMail(
          userEmail,
          'Pago rechazado',
          `El pago por la orden ${orderId} ha sido rechazado.`,
        );
      } else {
        console.error(
          'No se encontró el email del usuario asociado a la orden',
        );
      }
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

  async getPaymentStatus(paymentId: string) {
    const url = `https://api.mercadopago.com/v1/payments/${paymentId}`;
    const paymentResponse = await this.httpRequest(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    if (!paymentResponse || !paymentResponse.id) {
      throw new Error('Respuesta inválida: no se encontró el ID del pago');
    }
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
