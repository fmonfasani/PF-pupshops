import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CuponService } from './cupones.service';
import { CreateCouponDto } from './cupones.dto';



@Controller('coupons')
export class CouponController {
  constructor(private readonly cuponService: CuponService) {}

  @Post()
  async createCoupon(@Body() createCouponDto: CreateCouponDto) {
    return this.cuponService.createCoupon(createCouponDto);
  }

  @Get(':code/apply')
  async applyCoupon(
    @Param('code') code: string,
    @Body('orderValue') orderValue: number,
    @Body('userId') userId?: string,
  ) {
    const discountValue = await this.cuponService.applyCoupon(code, orderValue, userId);
    return {
      originalOrderValue: orderValue,
      discountValue,
      finalOrderValue: orderValue - discountValue,
    };
  }
}