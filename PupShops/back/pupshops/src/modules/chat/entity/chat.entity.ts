import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sender: string;

  @Column()
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
