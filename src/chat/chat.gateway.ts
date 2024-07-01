import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets'
import { ChatService } from './chat.service'
import { CreateChatDto } from './dto/create-chat.dto'
import { UpdateChatDto } from './dto/update-chat.dto'
import { Server } from "socket.io"
import { OnModuleInit } from '@nestjs/common'
import { MessageDto } from './message/dto/create-message.dto'
import { MessageService } from './message/message.service'

@WebSocketGateway()
export class ChatGateway implements OnModuleInit{
    constructor(private readonly chatService: ChatService, private readonly messageService: MessageService) {}

    @WebSocketServer()
    server: Server;

    async onModuleInit(){
        this.server.on("connection", (socket)=>{
            console.log(socket.id)
            console.log("connected")
        })
    }

    @SubscribeMessage('newMessage')
    async onNewMessage(@MessageBody() body: MessageDto) {
        console.log(body)
        // let chat = await this.chatService.getByMembers()
        let newMessage = await this.messageService.create(body)
        console.log(newMessage)
        this.server.emit('onMessage', {
            msg: "New msg",
            content: newMessage
        })
    }

    @SubscribeMessage('removeChat')
    remove(@MessageBody() id: number) {
        return this.chatService.remove(id)
    }
}
