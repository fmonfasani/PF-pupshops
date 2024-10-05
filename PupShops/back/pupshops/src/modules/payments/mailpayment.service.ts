import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';
import { access } from 'fs';

@Injectable()
export class MailPaymentService {
  private oauth2Client;
  private transporter;
  private baseUrl: string;

  constructor(private configService: ConfigService) {
    //this.baseUrl = this.configService.get<string>('BASE_URL');
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      //(this.baseUrl = 'https://developers.google.com/oauthplayground'),
      //(this.baseUrl = 'https://pupshops-backend.onrender.com'), // camnbiar en produccion por este
      (this.baseUrl = 'https://0b26-190-17-115-142.ngrok-free.app'), // quitar en produccion
    );

    this.oauth2Client.setCredentials({
      refresh_token: process.env.OAUTH_REFRESH_TOKEN,
    });

    this.setupTransporter();
  }
  async setupTransporter() {
    try {
      /*const { token } = await this.oauth2Client.getAccessToken();
      if (!token) {
        throw new Error('No se pudo obtener el token de acceso');
      }
      console.log('Access Token obtenido:', token);*/

      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'pupshopscompany@gmail.com',
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN,
          accessToken:
            'ya29.a0AcM612wh3PMu65ahabZE0zWheq4MJn86VQ0ygEYDbf_HtNqvtmBxeRyP1cLbV4MQPbn-u9pjcfZia4Kg6acYjUiJEu-ganKx_aO9ci2JpUIiejFmQNql1-du8rAKsXIqI5TPe8SPTiZgJN1sq5QTTFmWvCF3CF8bRifXDal0aCgYKAYkSARISFQHGX2Miw_ifaR3XIJKFASkra3O-eQ0175',
        },
      });
    } catch (error) {
      console.error(
        'Error en la configuración del transporter:',
        error.message,
      );
      this.transporter = undefined;
    }
  }

  async sendMail(to: string, subject: string, text: string) {
    await this.setupTransporter();

    if (!this.transporter) {
      console.error(
        'Error: transporter is not defined. No se puede enviar el correo.',
      );
      return;
    }

    const mailOptions = {
      from: 'pupshopscompany@gmail.com',
      to,
      subject,
      text,
    };

    try {
      console.log(`Intentando enviar correo a ${to} con asunto ${subject}`);
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado:', info.response);
    } catch (error) {
      console.error('Error enviando el correo:', error);
    }
  }
}
