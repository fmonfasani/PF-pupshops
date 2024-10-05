import { Controller, Post, Body } from '@nestjs/common';
import { MailPaymentService } from './mailpayment.service';

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
      const to = 'fmonfasanidev@gmail.com'; // Email de prueba
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
}
