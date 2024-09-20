/* eslint-disable prettier/prettier */
// src/modules/payments/dto/create-payment.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  title: string;
  quantity: number;
  price: number;
}
