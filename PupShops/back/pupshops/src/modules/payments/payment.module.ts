/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PaymentsController } from './payment.controller';
import { PaymentsService } from './payment.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
