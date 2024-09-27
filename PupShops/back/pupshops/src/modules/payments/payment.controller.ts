import { Controller, Post, Body, Get, Query, Res } from '@nestjs/common';
import { PaymentsService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Response } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // Crear pago
  @Post('/create')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
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

  @Get('success')
  handleSuccess(@Query() query, @Res() res: Response) {
    const { payment_id, status, external_reference } = query;
    console.log('Pago exitoso:', { payment_id, status, external_reference });
    res.send('Pago completado con éxito. ¡Gracias!');
  }

  @Get('failure')
  handleFailure(@Query() query, @Res() res: Response) {
    console.log('Pago fallido:', query);
    res.send('Hubo un error con tu pago. Intenta nuevamente.');
  }

  @Get('pending')
  handlePending(@Query() query, @Res() res: Response) {
    console.log('Pago pendiente:', query);
    res.send('Tu pago está en proceso. Espera la confirmación.');
  }

  // Webhook para recibir notificaciones de Mercado Pago
  @Post('/webhook')
  async handleNotification(@Body() body: any, @Res() res: Response) {
    console.log('Notificación recibida:', body);

    const topic = body.topic || body.type;
    const resource =
      body.resource || (body.data && body.data.id) ? body.resource : null;

    try {
      if (topic === 'payment') {
        if (resource) {
          const paymentResponse =
            await this.paymentsService.getPaymentInfo(resource);
          if (paymentResponse && paymentResponse.id) {
            console.log('ID del pago:', paymentResponse.id);
          } else {
            console.error(
              'El ID del pago no fue encontrado en la respuesta:',
              paymentResponse,
            );
          }
        } else {
          console.error('Notificación de pago no contiene un recurso válido');
        }
      } else if (topic === 'merchant_order') {
        if (resource) {
          const orderResponse =
            await this.paymentsService.getOrderInfo(resource);
          if (orderResponse && orderResponse.id) {
            console.log('ID de la orden:', orderResponse.id);
          } else {
            console.error(
              'El ID de la orden no fue encontrado en la respuesta:',
              orderResponse,
            );
          }
        } else {
          console.error('Notificación de orden no contiene un recurso válido');
        }
      } else {
        console.error('Tipo de notificación no manejado:', topic);
      }

      res.status(200).send({ message: 'Notificación recibida y procesada' });
    } catch (error) {
      console.error('Error al manejar la notificación:', error.message);
      res.status(500).send({ message: 'Error al procesar la notificación' });
    }
  }
}
