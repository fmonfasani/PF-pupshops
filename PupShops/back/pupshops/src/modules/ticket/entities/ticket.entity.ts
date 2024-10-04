// src/tickets/entities/ticket.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { TicketResponse } from './ticket-response.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.tickets)
  user: User;

  @Column()
  subject: string;

  @Column('text')
  message: string;

  @Column({ default: 'open' })
  status: string; // 'open', 'closed'

  @OneToMany(() => TicketResponse, response => response.ticket)
  responses: TicketResponse[];
}
