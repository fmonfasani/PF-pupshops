import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cupon } from './cupones.entity';
import { CuponController } from './cupones.controller';
import { CuponService } from './cupones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cupon,])],
  controllers: [CuponController],
  providers: [CuponService],
})
export class CuponModule {}
