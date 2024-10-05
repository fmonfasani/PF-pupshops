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
import { OrderService } from '../order/order.service'; // Servicio para manejar las órdenes
import { MailPaymentService } from '../MailPayments/mailpayment.service'; // Servicio para manejar el correo
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

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly ordersService: OrderService, // Servicio para manejar las órdenes
    private readonly mailService: MailPaymentService, // Servicio para manejar el correo
  ) {}

  // Obtener pagos de un usuario
  @Get('/user/:userId/payments')
  @ApiOperation({ summary: 'Obtener los pagos realizados por un usuario' })
  @ApiParam({
    name: 'userId',
    description: 'El ID del usuario',
    example: '8d56d89e-6d58-4f0b-aeed-2a838fbc54b5',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de pagos realizados por el usuario',
    type: [Payment],
  })
  @ApiResponse({
    status: 404,
    description:
      'No se encontraron pagos para el usuario con el ID proporcionado',
  })
  async getUserPayments(@Param('userId') userId: string) {
    const payments = await this.paymentsService.getPaymentsByUser(userId);
    if (!payments || payments.length === 0) {
      throw new NotFoundException(
        `No se encontraron pagos para el usuario con ID ${userId}`,
      );
    }
    return payments;
  }

  // Crear preferencia de pago
  @Post('/create')
  @ApiOperation({ summary: 'Crear una preferencia de pago' })
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

  // Manejar redirección de pago exitoso
  @Get('success')
  @ApiExcludeEndpoint()
  async handleSuccess(@Query() query, @Res() res: Response) {
    const { payment_id, status, external_reference } = query;
    console.log('Pago exitoso:', { payment_id, status, external_reference });

    try {
      // Obtener la orden asociada utilizando external_reference (orderId)
      const order = await this.ordersService.findOne(external_reference); // Usar findOne en el servicio de órdenes

      // Obtener el correo del usuario relacionado con la orden
      const userEmail = order.user.email;

      // Enviar un correo de confirmación al usuario
      const subject = 'Confirmación de tu compra';
      const text = `Gracias por tu compra. El pago con ID ${payment_id} ha sido completado con éxito.`;

      await this.mailService.sendMail(userEmail, subject, text);

      // Enviar respuesta al cliente
      res.send('Pago completado con éxito. ¡Gracias!');
    } catch (error) {
      console.error('Error procesando el pago exitoso:', error.message);
      res.status(500).send('Error procesando el pago.');
    }
  }

  // Manejar redirección de pago fallido
  @Get('failure')
  @ApiExcludeEndpoint()
  async handleFailure(@Query() query, @Res() res: Response) {
    console.log('Pago fallido:', query);

    try {
      const userEmail = query.email || 'usuario@ejemplo.com';
      const subject = 'Pago fallido';
      const text = `Hubo un problema con tu pago. Por favor, inténtalo nuevamente.`;

      await this.mailService.sendMail(userEmail, subject, text);

      res.send('Hubo un error con tu pago. Intenta nuevamente.');
    } catch (error) {
      console.error('Error procesando el pago fallido:', error.message);
      res.status(500).send('Error procesando el pago fallido.');
    }
  }

  // Manejar redirección de pago pendiente
  @Get('pending')
  @ApiExcludeEndpoint()
  async handlePending(@Query() query, @Res() res: Response) {
    console.log('Pago pendiente:', query);

    try {
      const userEmail = query.email || 'usuario@ejemplo.com';
      const subject = 'Pago pendiente';
      const text = `Tu pago está en proceso. Te notificaremos cuando se haya completado.`;

      await this.mailService.sendMail(userEmail, subject, text);

      res.send('Tu pago está en proceso. Espera la confirmación.');
    } catch (error) {
      console.error('Error procesando el pago pendiente:', error.message);
      res.status(500).send('Error procesando el pago pendiente.');
    }
  }

  // Webhook para recibir notificaciones de Mercado Pago
  @Post('/webhook')
  @ApiExcludeEndpoint()
  async handleNotification(@Body() body: any, @Res() res: Response) {
    const topic = body.topic || body.type;
    const resource =
      body.resource || (body.data && body.data.id) ? body.resource : null;

    try {
      if (topic === 'payment') {
        if (resource) {
          const paymentId = resource.split('/').pop(); // Extraer el ID del pago
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
