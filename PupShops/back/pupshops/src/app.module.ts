import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { ProductsModule } from './modules/products/products.module';
import { OrderModule } from './modules/order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';




@Module({
  imports: [TypeOrmModule,
    UsersModule, 
    AppointmentsModule, 
    ProductsModule, 
    OrderModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
