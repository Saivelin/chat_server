import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({description: "The user's first and last name separated by a space"})
    login: string
    @ApiProperty({description: "Password"})
    password: string
}