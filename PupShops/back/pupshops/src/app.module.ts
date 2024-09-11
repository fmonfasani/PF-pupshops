import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CredentialsModule } from './credentials/credentials.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order-detail/order-detail.module';

@Module({
  imports: [UsersModule, CredentialsModule, AppointmentsModule, ProductsModule, OrderModule, OrderDetailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
