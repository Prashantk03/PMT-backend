import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    register(@Body() dto: CreateUserDto){
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto){
        return this.authService.login(dto);
    }
}
