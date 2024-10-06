import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cupon } from './cupones.entity';
import { CreateCouponDto } from './cupones.dto';

@Injectable()
export class CuponService {
  constructor(
    @InjectRepository(Cupon)
    private cuponRepository: Repository<Cupon>,
  ) {}

  async createCoupon(data: CreateCouponDto): Promise<Cupon> {
    try {
      const coupon = this.cuponRepository.create(data);
      return await this.cuponRepository.save(coupon);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el cupón.');
    }
  }

  async validateCoupon(code: string, orderValue: number, userId?: string): Promise<Cupon> {
    try {
      const coupon = await this.cuponRepository.findOne({ where: { code } });

      if (!coupon) {
        throw new NotFoundException('Cupón no encontrado.');
      }

      if (!coupon.isActive || new Date(coupon.expiryDate) < new Date()) {
        throw new BadRequestException('Cupón expirado o inactivo.');
      }

      if (orderValue < coupon.minimumOrderValue) {
        throw new BadRequestException('El valor del pedido es insuficiente para aplicar este cupón.');
      }

      if (coupon.currentUses >= coupon.maxUses) {
        throw new BadRequestException('Este cupón ha alcanzado el límite de usos permitidos.');
      }

      if (coupon.userId && coupon.userId !== userId) {
        throw new BadRequestException('Este cupón no puede ser utilizado por este usuario.');
      }

      return coupon;
    } catch (error) {
      throw new InternalServerErrorException('Error al validar el cupón.');
    }
  }

  async applyCoupon(code: string, orderValue: number, userId?: string): Promise<number> {
    try {
      const coupon = await this.validateCoupon(code, orderValue, userId);

      const discountValue = orderValue * (coupon.discount / 100);

      coupon.currentUses += 1;
      await this.cuponRepository.save(coupon);

      return discountValue;
    } catch (error) {
      throw new InternalServerErrorException('Error al aplicar el cupón.');
    }
  }
}
