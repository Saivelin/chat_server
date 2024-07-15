import { HttpCode, HttpStatus, Injectable } from '@nestjs/common'
import { MessageDto } from './dto/create-message.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class MessageRepository {
    constructor(public prisma: PrismaService){}
    async create(createMessageDto: MessageDto) {
        try{
            let message = await this.prisma.message.create({data: createMessageDto})
            return message
        }
        catch{
            return `error`
        }
    }

    findAllByChat(id: number) {
        return this.prisma.message.findMany({where: {chatId: id}})
    }

    findOne(id: number) {
        return this.prisma.message.findMany({where: {id: id}})
    }

    update(id: number, updateMessageDto: MessageDto) {
        return this.prisma.message.update({where: {id: id}, data: updateMessageDto})
    }

    remove(id: number) {
        return this.prisma.message.delete({where: {id: id}})
    }

    findAll(){
        return this.prisma.message.findMany()
    }

    check(id: number){
        return this.prisma.message.update({where: {id: id}, data: {checked: true}})
    }
}
