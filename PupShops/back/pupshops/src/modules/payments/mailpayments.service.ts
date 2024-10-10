import { Injectable } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailPaymentsService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: process.env.OAUTH_ACCESS_TOKEN,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.MAIL_USER,
        to,
        subject,
        text,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado correctamente:', result.response);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  }
}
