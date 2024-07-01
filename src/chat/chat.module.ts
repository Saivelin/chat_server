import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MessageModule } from './message/message.module';
import { ChatRepository } from './chat.repository';
import { PrismaService } from 'src/prisma.service';
import { ChatController } from './chat.controller';
import { MessageService } from './message/message.service';
import { MessageRepository } from './message/message.repository';

@Module({
  providers: [ChatGateway, ChatService, ChatRepository, PrismaService, MessageService, MessageRepository],
  controllers: [ChatController],
  imports: [MessageModule],
})
export class ChatModule {}
