import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  Req,
  UseGuards,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '../../auth/roles/roles.enum';
import { AuthGuard } from '../../auth/auth.guard';
import { RolesGuard } from '../../auth/roles/roles.guard';
import { Roles } from '../../auth/roles/roles.decorator';

import { AdminService } from './admin.service';
import { AdminUpdateUserDto } from './dto/admin-update-user.dto';
import { AdminCreateUserDto } from './dto/admin-create-user.dto';
import { plainToClass } from 'class-transformer';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.Admin)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @HttpCode(200)
  @Get('/users')
  async getUsers(@Query('page') page = 1, @Query('limit') limit = 3) {
    try {
      const validPage = Math.max(1, Number(page));
      const validLimit = Math.max(1, Number(limit));
      return await this.adminService.getUsers(validPage, validLimit);
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener usuarios');
    }
  }

  @HttpCode(200)
  @Get('users/findUser')
  async getUserByMail(@Query('email') email: string) {
    try {
      return await this.adminService.getUserByEmail(email);
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar el usuario por email');
    }
  }

  @HttpCode(200)
  @Get('users/:id')
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const user = await this.adminService.getUserById(id);
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar el usuario por ID');
    }
  }
  @Post('users/register')
  @HttpCode(201)
  async signUp(
    @Body() user: AdminCreateUserDto,
    @Req() request: Request & { now: string },
  ) {
    console.log('Usuario creado a las: ', request.now);
    const nuevoUsuario = await this.adminService.createUser(user);
    return plainToClass(AdminCreateUserDto, nuevoUsuario, {
      excludeExtraneousValues: true,
    });
  }


  @HttpCode(200)
  @Put('users/:id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: AdminUpdateUserDto,
    @Req() req: any,
  ) {
    try {
      const currentUser = req.user;
      const updatedUser = await this.adminService.updateUser(id, user);
      if (!updatedUser) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }

  @HttpCode(200)
  @Delete('/users/:id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const result = await this.adminService.deleteUser(id);
      if (!result) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return { message: 'Usuario eliminado con éxito' };
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el usuario');
    }
  }
}
