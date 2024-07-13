import { Injectable } from '@nestjs/common'
import { UserDto, UserUpdateDto } from './dto/user.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UsersRepository {
    constructor(public prisma: PrismaService) {}
    create(createUserDto: UserDto) {
        return this.prisma.user.create({data: createUserDto})
    }

    findAll() {
        return this.prisma.user.findMany()
    }

    findOne(id: number) {
        return this.prisma.user.findFirst({ where: { id: id } })
    }

    update(id: number, updateUserDto: UserUpdateDto) {
        return this.prisma.user.update({ data: updateUserDto, where: { id: id } })
    }

    remove(id: number) {
        return this.prisma.user.delete({ where: { id: id } })
    }

    getByLogin(login: string) {
        let login_full = login.split(' ')
        return this.prisma.user.findFirst({ where: { name: login_full[0], AND: { surname: login_full[1] } } })
    }
}
