import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common'
import { ChatService } from './chat.service'
import { CreateChatDto } from './dto/create-chat.dto'
import { ApiOperation, ApiParam, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger'

@ApiTags("Chats")
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post()
    @ApiOperation({ summary: "Creates a chat" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    create(@Body() createUserDto: CreateChatDto) {
        return this.chatService.create(createUserDto)
    }

    @Get()
    findMany() {
        return this.chatService.findMany()
    }

    @Get('/user/:id')
    findAll(@Param('id') id: string) {
        return this.chatService.findAllByUserId(+id)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.chatService.findOne(+id)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.chatService.remove(+id)
    }
}
