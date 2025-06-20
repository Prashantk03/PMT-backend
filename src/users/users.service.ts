import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument} from './schemas/user.schemas'
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ){}

    async create(createUserDto: CreateUserDto): Promise<User>{
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }

    async findByEmail(email: string): Promise<User | null>{
        return this.userModel.findOne({ email }).exec();
    }
}

