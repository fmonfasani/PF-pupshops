import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity()
export class TicketResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Ticket, ticket => ticket.responses)
  ticket: Ticket;

  @Column('text')
  response: string;

  @Column()
  responderId: string; // ID del administrador que responde
}
