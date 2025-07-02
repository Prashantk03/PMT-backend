import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board, BoardDocument } from './board.schema';
import { CreateBoardDto } from './dto/create-board.dto';
import { User } from 'src/users/schemas/user.schemas';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createBoardDto: CreateBoardDto, userId: string): Promise<Board> {
    return this.boardModel.create({ ...createBoardDto, createdBy: userId });
  }

  async findById(id: string, userId: string): Promise<Board> {
  const board = await this.boardModel
    .findById(id)
    .populate('members', 'name email')
    .exec();

  if (!board) throw new NotFoundException('Board not found');

  const isCreator = board.createdBy.toString() === userId;
  const isMember = board.members.some((member: any) => member._id.toString() === userId);

  if (!isCreator && !isMember) {
    throw new NotFoundException('You are not allowed to access this board');
  }

  return board;
}


  async findByUser(userId: string): Promise<Board[]> {
    return this.boardModel
    .find({
      $or: [
        { createdBy: userId},
        { members: userId},
      ]
    })
    .populate('members', 'name email').exec();
  }

  async remove(id: string, userId: string) {
    return this.boardModel.findOneAndDelete({ _id: id, createdBy: userId });
  }

// Invite Users to a board task
  async inviteUser(boardId: string, userEmail: string, requestingUserId: string) {
  const user = await this.userModel.findOne({ email: userEmail });
  if (!user) throw new NotFoundException('User not found');
  console.log('received email', userEmail);
  

  const updatedBoard = await this.boardModel.findByIdAndUpdate(
    boardId,
    { $addToSet: { members: user._id } }, // ✅ ensure no duplicates
    { new: true } // ✅ return updated document
  ).populate('members', 'name email'); // optional: populate name/email for frontend

  return {
    message: 'User invited successfully',
    board: updatedBoard,
  };
}

}
