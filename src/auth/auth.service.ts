import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserDocument } from 'src/users/schemas/user.schemas';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ){}

    async register(dto: CreateUserDto){
        const hashed = await bcrypt.hash(dto.password, 10);
        console.log('DTO:', dto);
        console.log('Hashed Password:', hashed);
        const user = await this.userService.create({ ...dto, password: hashed });
        return { message: 'User registered', user};
    }

    async login(dto: LoginDto){
        const user = await this.userService.findByEmail(dto.email) as UserDocument;
        if (!user) throw new UnauthorizedException('Invalid email or password');

        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) throw new UnauthorizedException('Invalid email or password');

        const payload = { sub: user._id, email: user.email };
        const token = await this.jwtService.signAsync(payload);

        return { access_token: token};
    }
}
