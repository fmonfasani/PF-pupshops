/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('webhook')
export class WebhookController {
  @Post()
  @ApiExcludeEndpoint()
  handleWebhook(@Body() body: any) {
    console.log('Webhook recibido:', body);

    return { received: true };
  }
}
