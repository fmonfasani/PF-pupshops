import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';


@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Get()
async getAllMessages() {
  return this.chatService.getAllMessages();
}

@Get('filter/:parentId')
async filterMessages(@Param('parentId') parentId: string) {
  return this.chatService.getMessagesByParentId(parentId);
}

@Post('send')
async sendMessage(@Body() body: { sender: string; content: string; parentId?: string }) {
  const message = await this.chatService.saveMessage(body.sender, body.content, body.parentId);
  return message;
}
}
