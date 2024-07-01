import { ApiProperty } from "@nestjs/swagger"

export class CreateChatDto {
    @ApiProperty({description: "Ids of members"})
    members: number[]
    @ApiProperty({description: "Ids of messages"})
    messages: number[]
}
