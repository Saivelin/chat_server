import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UserDto } from 'src/users/dto/user.dto'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(login, password) {
        const user = await this.validateUser(login, password)
        return this.generateToken(user)
    }

    async registration(candidateData: UserDto) {
        const candidate = await this.userService.getUserByLogin(candidateData.name, candidateData.surname)
        if (candidate) {
            throw new HttpException('Error', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(candidateData.password, 5)
        const user = await this.userService.create({...candidateData, password: hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user) {
        const payload = { login: user.login, id: user.id }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(login, password) {
        const login_full = login.split(' ')
        console.log(login_full)
        const user = await this.userService.getUserByLogin(login_full[0], login_full[1])
        if (!user) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }
        console.log(password)
        console.log(user.password)
        const passwordEquals = await bcrypt.compare(password, user.password)

        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({ message: 'Некорректный логин или пароль пользователя' })
    }
}
