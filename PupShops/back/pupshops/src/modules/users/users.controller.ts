import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

    @HttpCode(200)
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put(':id')
    async updateUser(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() user: UpdateUserDto,
      @Req() req: any,
    ) {
      const currentUser = req.user;
          
      if (currentUser.id !== id) {
        throw new ForbiddenException('No tienes permiso para modificar este perfil');
      }
    
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
    async deleteUser(@Param('id', ParseUUIDPipe) id: string, @Req() req: any) {
      const currentUser = req.user;
    
      if (currentUser.id !== id) {
        throw new ForbiddenException('No tienes permiso para eliminar este perfil');
      }
    
      const result = await this.usersService.deleteUser(id);
      if (!result) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return { message: 'Usuario eliminado con éxito' };
    }
}
