/* eslint-disable prettier/prettier */
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
}
