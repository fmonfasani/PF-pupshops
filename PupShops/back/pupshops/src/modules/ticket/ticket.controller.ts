import { Controller, Post, Body, Param, Put, Req, Get, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { CreateTicketResponseDto } from './dto/ticket-response.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';


@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async createTicket(@Body() createTicketDto: CreateTicketDto, @Req() req: any) {
    const userId = req.user.id;
    return this.ticketsService.createTicket(createTicketDto, userId);
  }

  @Post(':id/respond')
  async respondToTicket(@Param('id') id: string, @Body() responseDto: CreateTicketResponseDto) {
    return this.ticketsService.respondToTicket(id, responseDto);
  }

  @Put(':id/close')
  async closeTicket(@Param('id') id: string) {
    return this.ticketsService.closeTicket(id);
  }

  @UseGuards(RolesGuard)
  /* @Roles(Role.Admin) */
  @Get()
  async getAllTickets() {
    return this.ticketsService.getAllTickets();
  }

  @Get(':id/responses')
  async getTicketResponses(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    return this.ticketsService.getUserTicketResponses(id, userId); 
  }
}
