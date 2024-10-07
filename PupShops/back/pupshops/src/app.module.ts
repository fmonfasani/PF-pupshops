import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { OrderModule } from './modules/order/order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import typeOrmConfig from './config/typeorm';
import { ServicesModule } from './modules/service/services.module';
import { AppointmentModule } from './modules/appointments/appointments.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { WebhookModule } from './modules/webhook/webhook.module';
import { PaymentsModule } from './modules/payments/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'),
    }),

    PaymentsModule,
    WebhookModule,
    AppointmentModule,
    CategoriesModule,
    ServicesModule,
    UsersModule,
    ProductsModule,
    OrderModule,
    AuthModule,
    JwtModule.register({
      global: true,
      signOptions: {
        expiresIn: '1h',
      },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
