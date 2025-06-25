import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board, BoardDocument } from './board.schema';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    constructor(@InjectModel(Board.name) private boardModel: Model<BoardDocument>){}

    async create(createBoardDto: CreateBoardDto, userId: string): Promise<Board>{
        return this.boardModel.create({ ...createBoardDto, createdBy: userId });
    }

    async findById(id: string): Promise<Board | null> {
        return this.boardModel.findById(id).exec();
    }

    async findByUser(userId: string): Promise<Board[]> {
        return this.boardModel.find({ createdBy:userId }).exec();
    }

     async remove(id: string, userId: string) {
    return this.boardModel.findOneAndDelete({ _id: id, createdBy: userId });
  }
}
