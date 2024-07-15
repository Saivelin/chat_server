import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common'
import { MessageService } from './message.service'
import { MessageDto } from './dto/create-message.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags("Messages")
@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Post()
    @ApiOperation({ summary: "Creates a message" })
    create(@Body() createMessageDto: MessageDto) {
        return this.messageService.create(createMessageDto)
    }

    @Get()
    @ApiOperation({ summary: "Find all messages" })
    findAll() {
        return this.messageService.findAll()
    }

    @Get('/chat/:id')
    @ApiOperation({ summary: "Find all messages in chat" })
    findAllByChatId(@Param('id') id: number) {
        return this.messageService.findAllByChatId(id)
    }

    @Get(':id')
    @ApiOperation({ summary: "Find message by message id" })
    findOne(@Param('id') id: string) {
        return this.messageService.findOne(+id)
    }

    @Patch(':id')
    @ApiOperation({ summary: "Update message" })
    update(@Param('id') id: string, @Body() updateMessageDto: MessageDto) {
        return this.messageService.update(+id, updateMessageDto)
    }

    @Delete(':id')
    @ApiOperation({ summary: "Remove message" })
    remove(@Param('id') id: string) {
        return this.messageService.remove(+id)
    }

    @Post('/check')
    @ApiOperation({summary: "Check message"})
    check(@Body() data: {id: number}){
        if(typeof(data.id) == "string" || typeof(data.id) == "number"){
            return this.messageService.check(+data.id)
        } else {
            return {status: HttpStatus.BAD_REQUEST, message: "id: number || string", error: "type error"}
        }
    }
}
