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
  private readonly mercadoPagoUrl = 'https://api.mercadopago.com/v1/payments';
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

  private readonly ngrokBaseUrl = 'https://fcc3-190-17-115-142.ngrok-free.app';

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

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { type, title, totalAmount, orderId } = createPaymentDto;

    // Buscar la orden de compra en la base de datos
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
          quantity: 1,
          currency_id: 'ARS',
          unit_price: totalAmount,
          id: type === 'service' ? 'service_1234' : 'product_1234',
        },
      ],

      external_reference: orderId,

      back_urls: {
        success: `${this.ngrokBaseUrl}/success`,
        failure: `${this.ngrokBaseUrl}/failure`,
        pending: `${this.ngrokBaseUrl}/pending`,
      },
      notification_url: `${this.ngrokBaseUrl}/payments/webhook`,
      auto_return: 'approved',

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

      return await response.json();
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
    const paymentResponse = await this.httpRequest(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    console.log(
      'Respuesta del pago:',
      JSON.stringify(paymentResponse, null, 2),
    );

    if (!paymentResponse || !paymentResponse.id) {
      throw new Error('Respuesta inválida: no se encontró el ID del pago');
    }
    return paymentResponse;
  }

  async getPaymentInfo(resource: string) {
    if (
      resource.startsWith(
        'https://api.mercadopago.com/collections/notifications/',
      )
    ) {
      const paymentId = resource.split('/').pop(); // Extrae el ID del pago desde la URL
      if (paymentId) {
        return await this.getPaymentStatus(paymentId);
      } else {
        throw new Error('No se pudo extraer el ID del pago desde el recurso');
      }
    } else if (
      resource.startsWith('https://api.mercadopago.com/merchant_orders/')
    ) {
      return this.getOrderInfo(resource);
    } else {
      throw new Error('URL de recurso inválida o no reconocida');
    }
  }

  async getOrderInfo(resource: string) {
    const orderResponse = await this.httpRequest(resource, {
      method: 'GET',
    });

    if (!orderResponse || !orderResponse.id) {
      throw new Error('Respuesta inválida: no se encontró el ID de la orden');
    }
    return orderResponse;
  }
}
