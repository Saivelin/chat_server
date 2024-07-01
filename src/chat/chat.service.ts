import { Injectable } from '@nestjs/common'
import { CreateChatDto } from './dto/create-chat.dto'
import { UpdateChatDto } from './dto/update-chat.dto'
import { ChatRepository } from './chat.repository'

@Injectable()
export class ChatService {
    constructor(public repository: ChatRepository){}
    create(createChatDto: CreateChatDto) {
        return this.repository.create(createChatDto)
    }

    findAllByUserId(id: number) {
        return this.repository.findAllByUserId(id)
    }

    findOne(id: number) {
        return this.repository.findOne(id)
    }

    remove(id: number) {
        return this.repository.remove(id)
    }

    getByMembers(id: number[]) {
        return this.repository.getByMembers(id)
    }

    findMany(){
        return this.repository.findMany()
    }
}
