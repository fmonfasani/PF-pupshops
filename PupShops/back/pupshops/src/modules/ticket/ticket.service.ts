import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';

import { CreateTicketDto } from './dto/create-ticket.dto'; 
import { User } from '../users/entities/user.entity';
import { TicketStatus } from './ticket-status.enum';
import { TicketResponse } from './entities/ticket-response.entity';
import { CreateTicketResponseDto } from './dto/ticket-response.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(TicketResponse) private responsesRepository: Repository<TicketResponse>,
  ) {}


  async createTicket(createTicketDto: CreateTicketDto, userId: string): Promise<Ticket> {
    const ticket = this.ticketRepository.create({ ...createTicketDto, user: { id: userId } });
    return await this.ticketRepository.save(ticket);
  }

  async respondToTicket(ticketId: string, createTicketResponseDto: CreateTicketResponseDto): Promise<TicketResponse> {
    const ticket = await this.ticketRepository.findOne({ where: { id: ticketId } });
    if (!ticket) {
      throw new NotFoundException('Ticket no encontrado');
    }
    const response = this.responsesRepository.create({ ...createTicketResponseDto, ticket });
    return await this.responsesRepository.save(response);
  }

  async closeTicket(ticketId: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({ where: { id: ticketId } });
    if (!ticket) {
      throw new NotFoundException('Ticket no encontrado');
    }
    ticket.status = TicketStatus.CLOSED;
    return await this.ticketRepository.save(ticket);
  }

  async getUserTickets(userId: string): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: { user: { id: userId } },
    });
  }

  async getAllTickets(): Promise<Ticket[]> {
    return await this.ticketRepository.find({ relations: ['responses'] });
  }
  
  async getUserTicketResponses(ticketId: string, userId: string): Promise<TicketResponse[]> {
    const ticket = await this.ticketRepository.findOne({ where: { id: ticketId, user: { id: userId } }, relations: ['responses'] });
    if (!ticket) {
      throw new NotFoundException('No tienes acceso a este ticket o el ticket no existe');
    }
    return ticket.responses;
  }
}
