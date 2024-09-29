import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController,AdminController],
  providers: [UsersService,AdminService],
})
export class UsersModule {}
