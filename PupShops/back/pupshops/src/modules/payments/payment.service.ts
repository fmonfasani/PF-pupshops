/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class PaymentsService {
  private readonly mercadoPagoUrl =
    'https://api.mercadopago.com/checkout/preferences';
  private readonly accessToken =
    'TEST-6146790226028049-091521-ea17f9befb1673933065f26ce198f0cf-33614063'; // Coloca tu Access Token aquí

  async createPayment(createPaymentDto: any) {
    const preference = {
      items: [
        {
          title: createPaymentDto.title,
          quantity: createPaymentDto.quantity,
          currency_id: 'ARS',
          unit_price: createPaymentDto.price,
        },
      ],
      back_urls: {
        success: 'https://3e58-190-17-115-142.ngrok-free.app/success',
        failure: 'https://3e58-190-17-115-142.ngrok-free.app/failure',
        pending: 'https://3e58-190-17-115-142.ngrok-free.app/pending',
      },
      notification_url: 'https://3e58-190-17-115-142.ngrok-free.app/webhook',
      auto_return: 'approved',
    };

    try {
      const response = await fetch(this.mercadoPagoUrl, {
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
}
