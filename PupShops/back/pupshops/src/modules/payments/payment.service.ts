/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class PaymentsService {
  private readonly mercadoPagoUrl =
    'https://api.mercadopago.com/checkout/preferences';
  private readonly accessToken =
    'APP_USR-1158358512957720-092318-dfe5d1ec04ecb9c1622a5ea8adf71220-1994103886'; // Coloca tu Access Token aquí

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
        success: 'https://7b84-201-231-240-116.ngrok-free.app/success',
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
