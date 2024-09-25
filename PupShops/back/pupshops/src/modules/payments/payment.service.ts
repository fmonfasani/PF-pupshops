import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';

@Injectable()
export class PaymentsService {
  private readonly mercadoPagoUrl = 'https://api.mercadopago.com/v1/payments';

  private readonly mercadoPagoPreferenceUrl =
    'https://api.mercadopago.com/checkout/preferences';
  private readonly accessToken: string;

  constructor(private configService: ConfigService) {
    this.accessToken = this.configService.get<string>(
      'MERCADO_PAGO_ACCESS_TOKEN',
    );
  }

  // Crear preferencia de pago
  async createPayment(createPaymentDto: any) {
    const preference = {
      items: [
        {
          title: createPaymentDto.title,
          quantity: createPaymentDto.quantity,
          currency_id: 'ARS',
          unit_price: createPaymentDto.price,
          id: '1234',
          description: 'Peluqueria de perro',
          picture_url:
            'https://res.cloudinary.com/dncbavrxt/image/upload/v1727189968/samples/animals/three-dogs.jpg',
        },
      ],
      back_urls: {
        success: 'https://8659-190-17-115-142.ngrok-free.app/success',
        failure: 'https://8659-190-17-115-142.ngrok-free.app/failure',
        pending: 'https://8659-190-17-115-142.ngrok-free.app/pending',
      },
      notification_url:
        'https://8659-190-17-115-142.ngrok-free.app/payments/webhook',
      auto_return: 'approved',

      external_reference: 'fmonfasani@gmail.com',
      payment_methods: {
        excluded_payment_methods: [
          {
            id: 'visa', // Excluir el método de pago Visa
          },
        ],
        installments: 6, // Máximo número de cuotas
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
      return data;
    } catch (error) {
      console.error('Error al crear la preferencia:', error);
      throw new Error('No se pudo crear la preferencia de pago.');
    }
  }

  // Obtener el estado del pago usando el Payment ID
  async getPaymentStatus(paymentId: string) {
    try {
      const response = await fetch(`${this.mercadoPagoUrl}/${paymentId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener el estado del pago');
      }

      const data = await response.json();
      return data; // Detalles del pago
    } catch (error) {
      console.error('Error al obtener el estado del pago:', error);
      throw new Error('No se pudo obtener el estado del pago.');
    }
  }
  async getPaymentInfo(resource: string) {
    try {
      const response = await fetch(resource);
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener la información del pago:', error);
      throw error;
    }
  }

  async getOrderInfo(resource: string) {
    try {
      const response = await fetch(resource);
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener la información de la orden:', error);
      throw error;
    }
  }
}
