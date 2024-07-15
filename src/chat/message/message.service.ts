import { Injectable } from '@nestjs/common'
import { MessageDto } from './dto/create-message.dto'
import { MessageRepository } from './message.repository'

@Injectable()
export class MessageService {
    constructor(public repository: MessageRepository) {}
    create(createMessageDto: MessageDto) {
        return this.repository.create(createMessageDto)
    }

    findAll() {
        return this.repository.findAll()
    }

    findAllByChatId(id: number) {
        return this.repository.findAllByChat(id)
    }

    findOne(id: number) {
        return this.repository.findOne(id)
    }

    update(id: number, updateMessageDto: MessageDto) {
        return this.repository.update(id, updateMessageDto)
    }

    remove(id: number) {
        return this.repository.remove(id)
    }

    check(id: number){
        return this.repository.check(id)
    }
}
