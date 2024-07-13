import { ApiProperty } from "@nestjs/swagger"

export class UserDto {
    @ApiProperty({description: "Username"})
    name: string
    @ApiProperty({description: "User surname"})
    surname: string
    @ApiProperty({description: "User photo path"})
    photo: string
    @ApiProperty({description: "User password"})
    password: string
    @ApiProperty({description: "User active"})
    active?: boolean
    @ApiProperty({description: "User last active date or null"})
    activeDate?: string
}

export class UserUpdateDto {
    @ApiProperty({description: "Username"})
    name?: string
    @ApiProperty({description: "User surname"})
    surname?: string
    @ApiProperty({description: "User photo path"})
    photo?: string
    @ApiProperty({description: "User password"})
    password?: string
    @ApiProperty({description: "User active"})
    active?: boolean
    @ApiProperty({description: "User last active date or null"})
    activeDate?: string
}
