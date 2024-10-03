import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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
    try {
      const ticket = this.ticketRepository.create({ ...createTicketDto, user: { id: userId } });
      return await this.ticketRepository.save(ticket);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el ticket');
    }
  }

  async respondToTicket(ticketId: string, createTicketResponseDto: CreateTicketResponseDto): Promise<TicketResponse> {
    try {
      const ticket = await this.ticketRepository.findOne({ where: { id: ticketId } });
      if (!ticket) {
        throw new NotFoundException('Ticket no encontrado');
      }
      const response = this.responsesRepository.create({ ...createTicketResponseDto, ticket });
      return await this.responsesRepository.save(response);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al responder al ticket');
    }
  }

  async closeTicket(ticketId: string): Promise<Ticket> {
    try {
      const ticket = await this.ticketRepository.findOne({ where: { id: ticketId } });
      if (!ticket) {
        throw new NotFoundException('Ticket no encontrado');
      }
      ticket.status = TicketStatus.CLOSED;
      return await this.ticketRepository.save(ticket);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al cerrar el ticket');
    }
  }

  async getUserTickets(userId: string): Promise<Ticket[]> {
    try {
      return await this.ticketRepository.find({
        where: { user: { id: userId } },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los tickets del usuario');
    }
  }

  async getAllTickets(): Promise<Ticket[]> {
    try {
      return await this.ticketRepository.find({ relations: ['responses'] });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener todos los tickets');
    }
  }

  async getUserTicketResponses(ticketId: string, userId: string): Promise<TicketResponse[]> {
    try {
      const ticket = await this.ticketRepository.findOne({ where: { id: ticketId, user: { id: userId } }, relations: ['responses'] });
      if (!ticket) {
        throw new NotFoundException('No tienes acceso a este ticket o el ticket no existe');
      }
      return ticket.responses;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al obtener las respuestas del ticket');
    }
  }
}
