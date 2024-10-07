/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { PaymentsController } from './payment.controller';
import { PaymentsService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../order/entities/order.entity';
import { Payment } from './entities/payment.entity';
import { OrderModule } from '../order/order.module';
import { MailPaymentService } from './mailpayment.service';
import { MailPaymentController } from './mailpayment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Orders]), OrderModule],
  controllers: [PaymentsController, MailPaymentController],
  providers: [PaymentsService, MailPaymentService],
  exports: [PaymentsService, MailPaymentService],
})
export class PaymentsModule {}
