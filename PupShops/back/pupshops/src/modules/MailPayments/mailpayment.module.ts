import { Module } from '@nestjs/common';
import { MailPaymentService } from './mailpayment.service';
import { MailPaymentController } from './mailpayment.controller';

@Module({
  providers: [MailPaymentService],
  controllers: [MailPaymentController],
})
export class MailPaymentModule {}
