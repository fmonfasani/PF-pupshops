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
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Payment } from './entities/payment.entity';
@ApiTags('Payments') 
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  @Get('/user/:userId/payments')
  @ApiOperation({ summary: 'Obtener los pagos realizados por un usuario' }) // Descripción del endpoint
  @ApiParam({
    name: 'userId',
    description: 'El ID del usuario',
    example: '8d56d89e-6d58-4f0b-aeed-2a838fbc54b5',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de pagos realizados por el usuario',
    type: [Payment], // Indica que el retorno será un array de la entidad Payment
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
  @ApiOperation({ summary: 'Crear una preferencia de pago' })
  @ApiResponse({
    status: 201,
    description: 'Preferencia de pago creada exitosamente',
    schema: {
      example: {
        message: 'Preferencia de pagos creada exitosamente',
        payment: {
          id: '123456789',
          init_point: 'https://www.mercadopago.com/checkout/v1/payment',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Error al crear la preferencia de pago',
  })
  @ApiBody({
    description: 'Datos necesarios para crear la preferencia de pago',
    type: CreatePaymentDto,
  })
  // Crear pago
  @Post('/create')
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
  /*@ApiOperation({ summary: 'Manejar redirección de pago exitoso' })
  @ApiQuery({
    name: 'payment_id',
    required: true,
    description: 'ID del pago en Mercado Pago',
    example: '123456789',
  })
  @ApiQuery({
    name: 'status',
    required: true,
    description: 'Estado del pago',
    example: 'approved',
  })
  @ApiQuery({
    name: 'external_reference',
    required: true,
    description: 'Referencia externa (orderId)',
    example: '73b56cfb-d8e5-4097-b93e-e3b59de0e4f3',
  })*/
  @Get('success')
  handleSuccess(@Query() query, @Res() res: Response) {
    const { payment_id, status, external_reference } = query;
    console.log('Pago exitoso:', { payment_id, status, external_reference });
    res.send('Pago completado con éxito. ¡Gracias!');
  }

  // Manejar redirección de pago fallido
  @ApiOperation({ summary: 'Manejar redirección de pago fallido' })
  @Get('failure')
  handleFailure(@Query() query, @Res() res: Response) {
    console.log('Pago fallido:', query);
    res.send('Hubo un error con tu pago. Intenta nuevamente.');
  }

  // Manejar redirección de pago pendiente
  @ApiOperation({ summary: 'Manejar redirección de pago pendiente' })
  @Get('pending')
  handlePending(@Query() query, @Res() res: Response) {
    console.log('Pago pendiente:', query);
    res.send('Tu pago está en proceso. Espera la confirmación.');
  }
  /*
  @ApiOperation({ summary: 'Recibir notificaciones de Mercado Pago (Webhook)' })
  @ApiResponse({
    status: 200,
    description: 'Notificación recibida y procesada exitosamente',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al procesar la notificación',
  })*/

  // Webhook para recibir notificaciones de Mercado Pago
  @Post('/webhook')
  async handleNotification(@Body() body: any, @Res() res: Response) {
    const topic = body.topic || body.type;
    const resource =
      body.resource || (body.data && body.data.id) ? body.resource : null;

    try {
      if (topic === 'payment') {
        if (resource) {
          // Extraer el paymentId desde la URL o desde los datos de la notificación
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
