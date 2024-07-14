import { Injectable } from '@nestjs/common'
import { CreateChatDto } from './dto/create-chat.dto'
import { UpdateChatDto } from './dto/update-chat.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ChatRepository {
    constructor(public prisma: PrismaService) {}

    public includeAll = {include: {members: true, messages: true}}

    create(createChatDto: CreateChatDto) {
        return this.prisma.chat.create({
            data: {
                members: {
                    connect: createChatDto.members.map(el => ({ id: el }))
                },
                messages: {
                    connect: createChatDto.messages.map(el => ({ id: el }))
                }
            }, ...this.includeAll
        })
    }

    findAllByUserId(id: number) {
        return this.prisma.chat.findMany({ where: { members: { some: { id: id } } }, ...this.includeAll })
    }

    findOne(id: number) {
        return this.prisma.chat.findMany({ where: { id: id }, ...this.includeAll })
    }

    remove(id: number) {
        return this.prisma.chat.delete({ where: { id: id }, ...this.includeAll })
    }

    getByMembers(id: number[]){
        return this.prisma.chat.findMany({ where: { members: { some: { id: {in: id} } } }, ...this.includeAll })
    }

    findMany(){
        return this.prisma.chat.findMany({...this.includeAll})
    }

    getMessageByChatId(id){
        return this.prisma.message.findMany({where: {chatId: id}})
    }
}
