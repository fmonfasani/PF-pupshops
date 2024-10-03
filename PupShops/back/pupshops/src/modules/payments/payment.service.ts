import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Orders } from '../../modules/order/entities/order.entity';

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
  ) {
    this.accessToken = this.configService.get<string>(
      'MERCADO_PAGO_ACCESS_TOKEN',
    );
  }

  private readonly baseUrl = this.configService.get<string>(
    'BASE_URL_production',
  );

  // Método auxiliar para realizar solicitudes HTTP
  private async httpRequest(url: string, options: any) {
    try {
      if (!options.headers) {
        options.headers = {};
      }
      // Incluir el token de acceso en el header
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

  // Crear una preferencia de pago para una orden
  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { orderId, title, quantity, unit_price, type } = createPaymentDto;

    // Buscar la orden en la base de datos
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['orderDetails', 'orderDetails.products'],
    });

    if (!order) {
      throw new NotFoundException('Orden de compra no encontrada');
    }

    // Extraer la información de la orden
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
        installments: 6, // Permitir hasta 6 cuotas
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

  // Obtener el estado del pago
  async getPaymentStatus(paymentId: string) {
    const url = `https://api.mercadopago.com/v1/payments/${paymentId}`; // URL para obtener el estado del pago
    const paymentResponse = await this.httpRequest(url, { method: 'GET' });

    if (!paymentResponse || !paymentResponse.id) {
      throw new Error('Respuesta inválida: no se encontró el ID del pago');
    }

    return paymentResponse;
  }

  // Procesar la notificación de pago
  async processPaymentNotification(paymentId: string) {
    const paymentResponse = await this.getPaymentStatus(paymentId);
    const orderId = paymentResponse.external_reference;
    const status = paymentResponse.status;

    // Buscar la orden y actualizar el estado
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['payments'],
    });

    if (!order) {
      throw new Error('Orden no encontrada');
    }

    if (status === 'approved') {
      order.status = 'paid';
    } else if (status === 'rejected') {
      order.status = 'payment_failed';
    }

    // Guardar la orden y el pago en la base de datos
    const payment = new Payment();
    payment.id = paymentResponse.id;
    payment.status = paymentResponse.status;
    payment.transactionAmount = paymentResponse.transaction_amount;
    payment.order = order;

    await this.ordersRepository.save(order);
    await this.paymentRepository.save(payment);

    return paymentResponse;
  }

  async getPaymentsByUser(userId: string): Promise<Payment[]> {
    // Primero buscamos todas las órdenes asociadas al usuario
    const orders = await this.ordersRepository.find({
      where: { user: { id: userId } },
      relations: ['payments'], // Cargar los pagos asociados a las órdenes
    });

    if (!orders.length) {
      throw new NotFoundException(
        `No se encontraron órdenes para el usuario con ID ${userId}`,
      );
    }

    // Luego extraemos todos los pagos asociados a esas órdenes
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
  async getOrderInfo(resource: string) {
    try {
      // Hacer la solicitud a la URL proporcionada en el recurso
      const orderResponse = await this.httpRequest(resource, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`, // Incluye tu token de Mercado Pago
        },
      });

      // Verificar si se recibió una respuesta válida
      if (!orderResponse || !orderResponse.id) {
        throw new Error('Respuesta inválida: no se encontró el ID de la orden');
      }

      return orderResponse; // Devuelve la respuesta de la orden
    } catch (error) {
      console.error(
        'Error al obtener la información de la orden:',
        error.message,
      );
      throw error;
    }
  }
}
