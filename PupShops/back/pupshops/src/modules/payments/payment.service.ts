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
      // Agregar el header de autorización si no está presente en las opciones
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

          //   description: type === 'service' ? 'Descripción del servicio' : 'Descripción del producto', // Descripción adecuada según el tipo
          //    picture_url: type === 'service'?
          //   'https://your-service-image-url'
          //   : 'https://your-product-image-url',
          //    picture_url:
          //   'https://res.cloudinary.com/dncbavrxt/image/upload/v1727189968/samples/animals/three-dogs.jpg',
        },
      ],

      external_reference: orderId, // Referencia externa con el orden del negocio

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

      const data = await response.json();
      return data;
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

  // Obtener el estado del pago usando el Payment ID
  async getPaymentStatus(paymentId: string) {
    const url = `https://api.mercadopago.com/v1/payments/${paymentId}`;
    return this.httpRequest(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async getPaymentInfo(resource: string) {
    if (!resource.startsWith('https://api.mercadopago.com')) {
      throw new Error('URL de recurso inválida');
    }

    return this.httpRequest(resource, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.accessToken}`, // Asegúrate de enviar el token aquí
      },
    });
  }

  async getOrderInfo(resource: string) {
    return this.httpRequest(resource, {
      method: 'GET',
    });
  }
}
