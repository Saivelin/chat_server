import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets'
import { ChatService } from './chat.service'
import { CreateChatDto } from './dto/create-chat.dto'
import { UpdateChatDto } from './dto/update-chat.dto'
import { Server } from "socket.io"
import { OnModuleInit } from '@nestjs/common'
import { MessageDto } from './message/dto/create-message.dto'
import { MessageService } from './message/message.service'

@WebSocketGateway({cors: true})
export class ChatGateway implements OnModuleInit{
    constructor(private readonly chatService: ChatService, private readonly messageService: MessageService) {}

    @WebSocketServer()
    server: Server;

    async onModuleInit(){
        this.server.on("connection", (socket)=>{
            console.log(`Connected: ${socket.id}`)
        })
    }

    @SubscribeMessage('newMessage')
    async onNewMessage(@MessageBody() body: MessageDto) {
        console.log(body)
        let newMessage = await this.messageService.create(body)
        console.log(newMessage)
        this.server.emit('onMessage', newMessage)
    }

    @SubscribeMessage('checkMessage')
    async onCheckMessage(@MessageBody() body: {id: number}) {
        let message = await this.messageService.check(+body.id)
        this.server.emit('onCheck', message.id)
    }

    @SubscribeMessage('removeChat')
    remove(@MessageBody() id: number) {
        return this.chatService.remove(id)
    }
}
