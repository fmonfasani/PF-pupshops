/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';

@Controller('webhook')
export class WebhookController {
  @Post()
  handleWebhook(@Body() body: any) {
    console.log('Webhook recibido:', body);

    return { received: true };
  }
}
