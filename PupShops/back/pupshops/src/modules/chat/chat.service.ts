import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entity/chat.entity';
import { ChatResponse } from './chat.interface';


@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private messagesRepository: Repository<Chat>,
  ) {}

  async saveMessage(sender: string, content: string, parentId?: string): Promise<Chat> {
    const message = this.messagesRepository.create({ sender, content, parentId });
    return this.messagesRepository.save(message);
  }
  
  async getMessagesByParentId(parentId: string): Promise<ChatResponse[]> {
    // Obtener todos los mensajes
    const messages = await this.messagesRepository.find();
  
    // Filtrar mensaje original
    const parentMessage = messages.find(message => message.id === parentId);
    
    // Filtrar respuestas
    const replies = messages.filter(reply => reply.parentId === parentId);
  
    return [
      {
        ...parentMessage,
        replies, // Incluir respuestas agrupadas
      },
    ] as ChatResponse[]; // Asegurarse de que se devuelve como tipo ChatResponse
  }
  
  async getAllMessages(): Promise<Chat[]> {
    return this.messagesRepository.find();
  }
}
