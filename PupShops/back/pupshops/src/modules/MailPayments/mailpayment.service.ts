import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';

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
      //(this.baseUrl = 'https://pupshops-backend.onrender.com'),
      (this.baseUrl = 'https://0b26-190-17-115-142.ngrok-free.app'),
    );

    this.oauth2Client.setCredentials({
      refresh_token: process.env.OAUTH_REFRESH_TOKEN,
    });

    this.setupTransporter();
  }
  async setupTransporter() {
    try {
      // try {
      //   const accessToken = await this.oauth2Client.getAccessToken();
      //   console.log('Access Token:', accessToken);
      // } catch (error) {
      //   console.error('Error obteniendo el Access Token:', error);
      // }

      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'pupshopscompany@gmail.com',
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN,
          accessToken:
            'ya29.a0AcM612wRy5yJ7cv5nIFiS2x69ZatWpuuA9J2_g2yXREvzwFQOTQkZiRYdDcRMaGsqY8Wm1NfgLZYp6AFbKA4h3Gz--v_qN5C2gQRMG6g5UmCtsrIGG6VR3QNBI0XyFZBiIw__eoO0dDZ0mNSvXx4bz680Q8kgPB68hsj8NMQaCgYKASISARISFQHGX2Miysf1lV4Lp12M2zOWNS9csw0175',
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
