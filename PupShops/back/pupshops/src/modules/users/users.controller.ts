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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '../auth/roles/roles.enum';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(@Query('page') page: number, @Query('limit') limit: number) {
    console.log(`Page: ${page}, Limit: ${limit}`);
    if (page && limit) {
      return this.usersService.getUsers(page, limit);
    }
    return this.usersService.getUsers(1, 3);
  }
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/findUser')
  async getUserByMail(@Query('email') email: string) {
    const user = await this.usersService.getUserByEmail(email);
    console.log(user);
    return user;
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.updateUser(id, user);
    if (!updatedUser) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return updatedUser;
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.usersService.deleteUser(id);
    if (!result) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return { message: 'Usuario eliminado con éxito' };
  }
}
