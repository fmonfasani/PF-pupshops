/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PaymentsController } from './payment.controller';
import { PaymentsService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../order/entities/order.entity';
import { Payment } from './entities/payment.entity';
import { MailPaymentService } from '../MailPayments/mailpayment.service';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Orders]), OrderModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, MailPaymentService],
  exports: [MailPaymentService],
})
export class PaymentsModule {}
