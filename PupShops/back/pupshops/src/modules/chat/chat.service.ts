import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entity/chat.entity';


@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private messagesRepository: Repository<Chat>,
  ) {}

  async saveMessage(sender: string, content: string): Promise<Chat> {
    const message = this.messagesRepository.create({ sender, content });
    return this.messagesRepository.save(message);
  }

  async getAllMessages(): Promise<Chat[]> {
    return this.messagesRepository.find();
  }
}
