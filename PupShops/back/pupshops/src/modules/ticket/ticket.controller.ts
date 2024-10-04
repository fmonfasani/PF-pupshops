import { Controller, Post, Body, Param, Put, Req, Get, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { CreateTicketResponseDto } from './dto/ticket-response.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Crear un ticket' })
  @ApiResponse({ status: 201, description: 'El ticket ha sido creado exitosamente.' })
  async createTicket(@Body() createTicketDto: CreateTicketDto, @Req() req: any) {
    const userId = req.user.id;
    return this.ticketsService.createTicket(createTicketDto, userId);
  }

  @Post(':id/respond')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Responder a un ticket (solo para administradores)' })
  @ApiResponse({ status: 200, description: 'Respuesta al ticket enviada exitosamente.' })
  async respondToTicket(@Param('id') id: string, @Body() responseDto: CreateTicketResponseDto) {
    return this.ticketsService.respondToTicket(id, responseDto);
  }

  @Put(':id/close')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Cerrar un ticket (solo para administradores)' })
  @ApiResponse({ status: 200, description: 'El ticket ha sido cerrado.' })
  async closeTicket(@Param('id') id: string) {
    return this.ticketsService.closeTicket(id);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Obtener todos los tickets (solo para administradores)' })
  @ApiResponse({ status: 200, description: 'Lista de tickets obtenida.' })
  async getAllTickets() {
    return this.ticketsService.getAllTickets();
  }

  @Get(':id/responses')
  @ApiOperation({ summary: 'Obtener respuestas de un ticket' })
  @ApiResponse({ status: 200, description: 'Respuestas del ticket obtenidas.' })
  async getTicketResponses(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    return this.ticketsService.getUserTicketResponses(id, userId);
  }
}
