import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: '*' })
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  private connectedUsers: Record<string, string> = {};

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('connected');
      socket.on('add user', (data) => {
        this.connectedUsers[data.userId] = socket.id;
      });
      socket.on('disconnect', () => {
        const userId = Object.keys(this.connectedUsers).find(
          (key) => this.connectedUsers[key] === socket.id,
        );
        delete this.connectedUsers[userId];
      });
    });
  }

  emitCustomEvent(userId: string, eventData: any) {
    const socketId = this.connectedUsers[userId];
    if (socketId) {
      this.server.to(socketId).emit('send notification', eventData);
    }
  }

  @SubscribeMessage('send Message')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onMessage', {
      content: body,
    });
  }
}
