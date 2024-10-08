import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway() 
  export class ChatGateway {
    @WebSocketServer() server: Server;
  
    @SubscribeMessage('sendMessage')
    handleMessage(
      @MessageBody() data: { sender: string; message: string },
      @ConnectedSocket() client: Socket
    ): void {
      
      this.server.emit('receiveMessage', data);
    }
  
    
    handleConnection(@ConnectedSocket() client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    
    handleDisconnect(@ConnectedSocket() client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  }
  