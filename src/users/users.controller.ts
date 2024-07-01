import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common'
import { UsersService } from './users.service'
import { UserDto } from './dto/user.dto'
import { ApiOperation, ApiParam, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger'
import { User } from './entities/user.entity';

@ApiTags("Users")
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    private _notes: User[] = [];

    @Post()
    @ApiOperation({ summary: "Creates a user" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    create(@Body() createUserDto: UserDto) {
        return this.usersService.create(createUserDto)
    }

    @Get()
    findAll() {
        return this.usersService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UserDto) {
        return this.usersService.update(+id, updateUserDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id)
    }
}
