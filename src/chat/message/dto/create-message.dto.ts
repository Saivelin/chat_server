import { ApiProperty } from "@nestjs/swagger"

export class MessageDto {
    @ApiProperty({description: "text"})
    text: string
    @ApiProperty({description: "chat id"})
    chatId: number
    @ApiProperty({description: "user (author) id"})
    authorId: number
    @ApiProperty({description: "checked"})
    checked: boolean
    @ApiProperty({description: "url file list for message"})
    files?: string[]
}
