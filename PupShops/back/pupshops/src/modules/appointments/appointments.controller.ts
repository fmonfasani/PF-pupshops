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
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { RolesGuard } from '../auth/roles/roles.guard';

@ApiTags('Appointments') 
@Controller('appointments')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo turno para un servicio' }) 
  @ApiBody({ type: CreateAppointmentDto }) 
  @ApiResponse({
    status: 201,
    description: 'Turno creado exitosamente.',
    schema: {
      example: {
        message:
          'Se ha reservado un turno de Peluquería a las 10:00 con fecha 2024-09-30 exitosamente!',
        appointmentId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        serviceId: 'b18c1e9f-4c5b-4a3d-9a44-1c8e5d2c9e68',
        serviceName: 'Peluquería',
        userId: 'f29c2b3e-8c49-4b1a-a8c7-12c6e469a47d',
        userName: 'Juan Pérez',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(
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
    const user = req.user as User; 
    return this.appointmentsService.create(createAppointmentDto, user);
  }

  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Obtener todos los turnos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los turnos.',
    type: [Appointment], 
  })
  async findAll(): Promise<Appointment[]> {
    return this.appointmentsService.findAll();
  }

  @Get('user')
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
  @ApiOperation({ summary: 'Actualizar el estado de un turno' })
  @ApiParam({ name: 'id', description: 'ID del turno a actualizar' }) // Parámetro del ID del turno
  @ApiBody({
    schema: {
      example: { status: 'canceled' }, // Ejemplo de solicitud
    },
  })
  @ApiResponse({
    status: 200,
    description: 'El estado del turno ha sido actualizado.',
    type: Appointment,
  })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Appointment> {
    return this.appointmentsService.updateStatus(id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un turno (borrado lógico)' })
  @ApiParam({ name: 'id', description: 'ID del turno a eliminar' }) 
  @ApiResponse({
    status: 200,
    description: 'El turno ha sido eliminado exitosamente.',
  })
  remove(@Param('id') id: string): Promise<string> {
    return this.appointmentsService.remove(id);
  }
}
