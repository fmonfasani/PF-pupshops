import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { CuponService } from './cupones.service';
import { CreateCouponDto } from './cupones.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';

@ApiTags('Cupones')
@Controller('cupones')
export class CuponController {
  constructor(private readonly cuponService: CuponService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Crear un nuevo cupón' })
  @ApiResponse({ status: 201, description: 'Cupón creado exitosamente.' })
  @ApiBody({ type: CreateCouponDto })
  async createCoupon(@Body() createCouponDto: CreateCouponDto) {
    return this.cuponService.createCoupon(createCouponDto);
  }

  @Get(':code/apply')
  @ApiOperation({ summary: 'Aplicar un cupón' })
  @ApiParam({ name: 'code', description: 'Código del cupón', type: String })
  @ApiResponse({ status: 200, description: 'Cupón aplicado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Cupón no encontrado.' })
  @ApiResponse({ status: 400, description: 'Cupón no válido o inactivo.' })
  @ApiBody({ schema: { example: { orderValue: 100, userId: '123' } } })
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
