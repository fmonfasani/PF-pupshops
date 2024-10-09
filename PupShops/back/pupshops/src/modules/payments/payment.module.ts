/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PaymentsController } from './payment.controller';
import { PaymentsService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../order/entities/order.entity';
import { Payment } from './entities/payment.entity';
import { MailPaymentsService } from './mailpayments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Orders])],
  controllers: [PaymentsController],
  providers: [PaymentsService, MailPaymentsService],
})
export class PaymentsModule {}
