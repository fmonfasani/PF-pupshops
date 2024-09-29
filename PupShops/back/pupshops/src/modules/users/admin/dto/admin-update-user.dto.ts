import { PartialType } from '@nestjs/mapped-types';
import { AdminCreateUserDto } from './admin-create-user.dto';


export class AdminUpdateUserDto extends PartialType(AdminCreateUserDto) {}
