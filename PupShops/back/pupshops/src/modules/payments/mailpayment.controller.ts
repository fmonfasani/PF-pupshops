import { Controller, Post, Body } from '@nestjs/common';
import { MailPaymentService } from './mailpayment.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController() 
@Controller('mailpayment')
export class MailPaymentController {
  constructor(private readonly mailPaymentService: MailPaymentService) {}

  @Post('send')
  async sendMail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('text') text: string,
  ) {
    try {
      await this.mailPaymentService.sendMail(to, subject, text);
      return { message: 'Correo enviado exitosamente' };
    } catch (error) {
      return { message: 'Error enviando el correo', error: error.message };
    }
  }

  @Post('test')
  async sendTestMail() {
    try {
      const to = 'fmonfasanidev@gmail.com';
      const subject = 'Correo de prueba';
      const text =
        'Este es un correo de prueba enviado desde NestJS usando Nodemailer.';
      await this.mailPaymentService.sendMail(to, subject, text);
      return { message: 'Correo de prueba enviado exitosamente' };
    } catch (error) {
      return {
        message: 'Error enviando el correo de prueba',
        error: error.message,
      };
    }
  }
  @Post('/payment/success')
  async handlePaymentSuccess(@Body() paymentData: any) {
    const { orderId, amount } = paymentData; // Valores del frontend o backend de pagos
    try {
      // Enviar correo de confirmación al vendedor (PupShops)
      await this.mailPaymentService.sendPaymentNotificationToSeller(
        orderId,
        amount,
      );

      return {
        message: 'Notificación de pago enviada al vendedor exitosamente.',
      };
    } catch (error) {
      return {
        message: 'Error enviando notificación al vendedor.',
        error: error.message,
      };
    }
  }
}
