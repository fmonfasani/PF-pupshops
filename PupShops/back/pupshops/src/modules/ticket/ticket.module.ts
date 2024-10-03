import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { User } from '../users/entities/user.entity';
import { TicketsController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { TicketResponse } from './entities/ticket-response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, TicketResponse,User])],
  controllers: [TicketsController],
  providers: [TicketService],
})
export class TicketsModule {}
