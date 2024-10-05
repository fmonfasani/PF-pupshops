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
    this.baseUrl = this.configService.get<string>('BASE_URL');
    console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
    console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
    console.log('OAUTH_REFRESH_TOKEN:', process.env.OAUTH_REFRESH_TOKEN);

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
      try {
        const accessToken = await this.oauth2Client.getAccessToken();
        console.log('Access Token:', accessToken);
      } catch (error) {
        console.error('Error obteniendo el Access Token:', error);
      }

      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'pupshopscompany@gmail.com',
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN,
          accessToken:
            'ya29.a0AcM612wG_N_MTg3A5VYRoEjyzQ36bL1i66SODZ92cTD0XOSOPwQvXd9cjCtdsZicLt3zwVe-SSlHIEU_h4-bkOd1EZynYwcFfRNXVuzvSqebcCU5z44gIrKDvPXz1Wtb7y9TSKPsPqPz4NYDVlFitmesh5McWeXBX2SGV0NwaCgYKAXkSARISFQHGX2MiJC3ufwvHpeg1bLMR3WuyEQ0175',
        },
      });
    } catch (error) {
      console.error('Error obteniendo el Access Token:', error);
    }
  }

  async sendMail(to: string, subject: string, text: string) {
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