import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Res,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { PaymentsService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Response } from 'express';
import {
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Payment } from './entities/payment.entity';
import { MailPaymentsService } from './mailpayments.service';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly mailPaymentsService: MailPaymentsService,
  ) {}

  @Post('/create')
  @ApiOperation({ summary: 'Crear una preferencia de pago' })
  @ApiBody({ type: CreatePaymentDto })
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      const payment =
        await this.paymentsService.createPayment(createPaymentDto);
      return {
        message: 'Preferencia de pago creada exitosamente',
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
  @ApiExcludeEndpoint()
  handleSuccess(@Query() query, @Res() res: Response) {
    const { payment_id, status, external_reference } = query;
    console.log('Pago exitoso:', { payment_id, status, external_reference });
    res.send('Pago completado con éxito. ¡Gracias!');
  }

  @Get('failure')
  @ApiExcludeEndpoint()
  handleFailure(@Query() query, @Res() res: Response) {
    console.log('Pago fallido:', query);
    res.send('Hubo un error con tu pago. Intenta nuevamente.');
  }

  @Get('pending')
  @ApiExcludeEndpoint()
  handlePending(@Query() query, @Res() res: Response) {
    console.log('Pago pendiente:', query);
    res.send('Tu pago está en proceso. Espera la confirmación.');
  }

  @Post('send-email')
  async sendEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('text') text: string,
  ): Promise<void> {
    return this.mailPaymentsService.sendMail(to, subject, text);
  }

  @Post('/webhook')
  @ApiExcludeEndpoint()
  async handleNotification(@Body() body: any, @Res() res: Response) {
    const topic = body.topic || body.type;
    const resource =
      body.resource || (body.data && body.data.id) ? body.resource : null;

    try {
      if (topic === 'payment') {
        if (resource) {
          const paymentId = resource.split('/').pop();
          await this.paymentsService.processPaymentNotification(paymentId);

          console.log('ID del pago:', paymentId);
        } else {
          console.error('Notificación de pago no contiene un recurso válido');
        }
      } else if (topic === 'merchant_order') {
        const orderResponse = await this.paymentsService.getOrderInfo(resource);
        console.log('ID de la orden:', orderResponse.id);
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
