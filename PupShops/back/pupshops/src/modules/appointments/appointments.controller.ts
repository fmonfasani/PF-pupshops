import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { User } from '../users/entities/user.entity';
import { Appointment } from './entities/appointment.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';

@ApiTags('Appointments')
@Controller('appointments')
@UseGuards(AuthGuard, RolesGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @Roles(Role.User)
  @ApiOperation({ summary: 'Crear un nuevo turno para un servicio' })
  create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @Req() req: any,
  ): Promise<{
    message: string;
    appointmentId: string;
    serviceId: string;
    serviceName: string;
    userId: string;
    userName: string;
  }> {
    console.log(req.user);
    const user = req.user as User; // Obtener el usuario autenticado desde el request
    return this.appointmentsService.create(createAppointmentDto, user);
  }

  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Obtener todos los turnos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los turnos.',
  })
  async findAll(): Promise<Appointment[]> {
    return this.appointmentsService.findAll();
  }

  @Get('user')
  @Roles(Role.User)
  @ApiOperation({ summary: 'Obtener turnos del usuario autenticado' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve los turnos históricos y agendados del usuario.',
    schema: {
      example: {
        scheduledAppointments: [
          {
            id: '123',
            appointmentDate: '2024-09-18T12:00:00.000Z',
            status: 'reserved',
            service: {
              id: 'service-id',
              name: 'Peluquería',
            },
          },
        ],
        historicalAppointments: [
          {
            id: '124',
            appointmentDate: '2024-09-10T10:00:00.000Z',
            status: 'completed',
            service: {
              id: 'service-id',
              name: 'Veterinaria',
            },
          },
        ],
      },
    },
  })
  getUserAppointments(@Req() req): Promise<{
    scheduledAppointments: Appointment[];
    historicalAppointments: Appointment[];
  }> {
    const userId = req.user.id; // Obtener el ID del usuario logueado desde el request
    return this.appointmentsService.getUserAppointments(userId);
  }

  @Patch(':id/status')
  @Roles(Role.User)
  @ApiOperation({ summary: 'Actualizar el estado de un turno' })
  @ApiResponse({
    status: 200,
    description: 'El estado del turno ha sido actualizado.',
    schema: {
      example: {
        id: 'f0e59ef0-819d-4f59-87be-4c847ac7e462',
        appointmentDate: '2024-09-17T10:00:00Z',
        status: 'canceled',
        user: {
          id: 'fe165c21-92bb-4066-bc98-2f0bfa999944',
          name: 'Juan',
          lastname: 'Sanchez',
        },
        service: {
          id: 'a9117bf4-1cf7-43d3-a07c-4de1df18252b',
          name: 'Peluquería',
        },
      },
    },
  })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Appointment> {
    return this.appointmentsService.updateStatus(id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un turno (borrado lógico)' })
  @ApiResponse({
    status: 200,
    description: 'El turno ha sido eliminado exitosamente.',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.appointmentsService.remove(id);
  }
}
