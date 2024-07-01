import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
        UsersModule,
        JwtModule.register({
        secret: process.env.SECRET_KEY,
        signOptions: {expiresIn: process.env.ACCESS_LIVE}
    })
  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
