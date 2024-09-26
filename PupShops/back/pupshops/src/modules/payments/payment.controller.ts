import { Controller, Post, Body, Get, Query, Res } from '@nestjs/common';
import { PaymentsService } from './payment.service';
import { Response } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // Crear pago
  @Post('/create')
  async createPayment(@Body() createPaymentDto: any) {
    try {
      const payment =
        await this.paymentsService.createPayment(createPaymentDto);
      return {
        message: 'Pago creado exitosamente',
        payment,
      };
    } catch (error) {
      return {
        message: 'Error al crear el pago',
        error: error.message,
      };
    }
  }

  // Redirección en caso de éxito
  @Get('success')
  handleSuccess(@Query() query, @Res() res: Response) {
    const { payment_id, status, external_reference } = query;
    console.log('Pago exitoso:', { payment_id, status, external_reference });
    res.send('Pago completado con éxito. ¡Gracias!');
  }

  // Redirección en caso de fallo
  @Get('failure')
  handleFailure(@Query() query, @Res() res: Response) {
    console.log('Pago fallido:', query);
    res.send('Hubo un error con tu pago. Intenta nuevamente.');
  }

  // Redirección en caso de pago pendiente
  @Get('pending')
  handlePending(@Query() query, @Res() res: Response) {
    console.log('Pago pendiente:', query);
    res.send('Tu pago está en proceso. Espera la confirmación.');
  }

  // Webhook para recibir notificaciones de Mercado Pago
  @Post('/webhook')
  async handleNotification(@Body() body: any) {
    console.log('Notificación recibida:', body);

    if (!body || !body.resource) {
      console.error('Notificación no contiene un resource válido');
      return;
    }

    const resource = body.resource;
    const topic = body.topic;

    try {
      if (topic === 'payment') {
        // Lógica para manejar el pago
        const paymentResponse =
          await this.paymentsService.getPaymentInfo(resource);
        if (!paymentResponse || !paymentResponse.id) {
          console.error('Respuesta de pago no contiene un id válido');
          return;
        }
        console.log('ID del pago:', paymentResponse.id);
        // Continúa con la lógica de procesamiento...
      } else if (topic === 'merchant_order') {
        // Lógica para manejar órdenes
        const orderResponse = await this.paymentsService.getOrderInfo(resource);
        if (!orderResponse || !orderResponse.id) {
          console.error('Respuesta de orden no contiene un id válido');
          return;
        }
        console.log('ID de la orden:', orderResponse.id);
        // Continúa con la lógica de procesamiento...
      } else {
        console.error('Tipo de notificación no manejado:', topic);
      }
    } catch (error) {
      console.error('Error al manejar la notificación:', error.message);
    }
  }
}
