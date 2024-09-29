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

  private readonly baseUrl = 'https://pupshops-backend.onrender.com';

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

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { type, title, quantity, unit_price, orderId } = createPaymentDto;

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
      notification_url: `${this.baseUrl}/payments/webhook`,
      auto_return: 'approved',
      payment_methods: {
        installments: 6, // Permitir hasta 6 cuotas
        excluded_payment_methods: [
          { id: 'visa' }, // Excluir Visa
        ],
      },
      metadata: {
        integrator_id: 'dev_24c65fb163bf11ea96500242ac130004', // Incluir el Integrator ID
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

      // Retornar solo el campo `init_point` de la respuesta
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

  async getPaymentStatus(paymentId: string) {
    const url = `https://api.mercadopago.com/v1/payments/${paymentId}`; // URL para obtener el estado del pago
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
        'https://api.mercadolibre.com/collections/notifications/',
      )
    ) {
      const paymentId = resource.split('/').pop(); // Extrae el ID del pago desde la URL
      if (paymentId) {
        return await this.getPaymentStatus(paymentId); // Usa el paymentId para obtener el estado del pago
      } else {
        throw new Error('No se pudo extraer el ID del pago desde el recurso');
      }
    } else if (
      resource.startsWith('https://api.mercadolibre.com/merchant_orders/')
    ) {
      return this.getOrderInfo(resource);
    } else {
      throw new Error('URL de recurso inválida o no reconocida');
    }
  }

  async getOrderInfo(resource: string) {
    try {
      // Hacer la solicitud a la URL proporcionada en el resource
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

  async processPaymentNotification(paymentId: string) {
    const paymentResponse = await this.getPaymentStatus(paymentId);

    if (!paymentResponse || !paymentResponse.id) {
      throw new Error('No se encontró el pago con el ID proporcionado');
    }

    const orderId = paymentResponse.external_reference; // ID de la orden
    const status = paymentResponse.status; // Estado del pago (approved, rejected, etc.)
    const transactionAmount = paymentResponse.transaction_amount; // Monto de la transacción

    // Buscar la orden en la base de datos
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['payments'],
    });

    if (!order) {
      throw new Error('Orden no encontrada');
    }

    // Actualizar el estado de la orden basado en el estado del pago
    if (status === 'approved') {
      order.status = 'paid'; // Cambiar a 'paid' si el pago es aprobado
    } else if (status === 'rejected') {
      order.status = 'payment_failed'; // Cambiar a 'payment_failed' si el pago es rechazado
    }

    // Guardar los detalles del pago en la base de datos
    const payment = new Payment();
    payment.id = paymentResponse.id;
    payment.status = paymentResponse.status;
    payment.transactionAmount = paymentResponse.transaction_amount;
    payment.order = order;

    // Guardar la orden y el pago en la base de datos
    await this.ordersRepository.save(order);
    await this.paymentRepository.save(payment);

    return paymentResponse;
  }

  async handlePaymentNotification(paymentResponse: any) {
    const payment = new Payment();
    payment.id = paymentResponse.id; // ID del pago de Mercado Pago
    payment.status = paymentResponse.status; // Estado del pago ('approved', 'rejected', etc.)

    payment.order = await this.ordersRepository.findOne({
      where: { id: paymentResponse.external_reference },
    });

    if (!payment.order) {
      throw new NotFoundException('Orden no encontrada');
    }

    // Guardar el pago en la base de datos
    await this.paymentRepository.save(payment);
  }
}
