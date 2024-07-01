import { Injectable } from '@nestjs/common'
import { UserDto } from './dto/user.dto'
import { PrismaService } from 'src/prisma.service'
import { UsersRepository } from './user.repository'

@Injectable()
export class UsersService {
    constructor(public repository: UsersRepository) {}
    create(createUserDto: UserDto) {
        !createUserDto?.active ? createUserDto.active = true : null
        !createUserDto?.activeDate ? createUserDto.activeDate = String(new Date()) : null
        return this.repository.create(createUserDto)
    }

    findAll() {
        return this.repository.findAll()
    }

    findOne(id: number) {
        return this.repository.findOne(id)
    }

    update(id: number, updateUserDto: UserDto) {
        return this.repository.update(id, updateUserDto)
    }

    remove(id: number) {
        return this.repository.remove(id)
    }

    getUserByLogin(name, surname){
        const login = `${name} ${surname}`
        return this.repository.getByLogin(login)
    }
}
