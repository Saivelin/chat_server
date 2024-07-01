import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserDto } from 'src/users/dto/user.dto';
import { LoginDto } from './dto/auth.dto';

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/login')
    async login(@Body() loginDto : LoginDto){
        return this.authService.login(loginDto.login, loginDto.password)
    }

    @Post('/registration')
    async registration(@Body() candidateData : UserDto){
        return this.authService.registration(candidateData)
    }

    @Post('/validate')
    @UseGuards(JwtAuthGuard)
    async validate(){
        return true
    }
}
