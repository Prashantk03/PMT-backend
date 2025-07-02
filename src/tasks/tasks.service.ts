import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { Board, BoardDocument } from 'src/boards/board.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    return this.taskModel.create({ ...createTaskDto, createdBy: userId });
  }

  async update(id: string, dto: Partial<CreateTaskDto>, userId: string) {
    return this.taskModel.findOneAndUpdate(
      { _id: id, createdBy: userId },
      dto,
      {
        new: true,
      },
    );
  }

  async remove(id: string, userId: string) {
    return this.taskModel.findOneAndDelete({ _id: id, createdBy: userId });
  }

  async findByBoard(boardId: string, userId: string) {
    const board = await this.boardModel.findById(boardId);
    if (!board) return [];

    const isCreator = board.createdBy.toString() === userId;
    const isMember = board.members.some(
      (memberId) => memberId.toString() === userId,
    );

    if (!isCreator && !isMember) {
      return [];
    }
    return this.taskModel.find({ boardId }).exec();
  }

  // Comment logic

  async addComment(taskId: string, comment: { text: string; author: string }) {
    return this.taskModel.findByIdAndUpdate(
      taskId,
      {
        $push: {
          comments: {
            ...comment,
            date: new Date(),
          },
        },
      },
      { new: true },
    );
  }

  async deleteComment(taskId: string, commentId: string, userId: string) {
    const task = await this.taskModel.findById(taskId).populate('boardId');
    if (!task) throw new NotFoundException('Task not found');

    const board = await this.boardModel.findById(task.boardId);
    if (!board) throw new NotFoundException('Board not found');

    // Find the comment
    const comment = task.comments.find(
      (c: any) => c._id.toString() === commentId,
    );
    if (!comment) throw new NotFoundException('Comment not found');

    const isBoardCreator = board.createdBy.toString() === userId;
    const isCommentAuthor = comment.author?.toString() === userId;

    if (!isBoardCreator && !isCommentAuthor) {
      throw new ForbiddenException('Not allowed to delete this comment');
    }

    // Remove the comment
    task.comments = task.comments.filter(
      (c: any) => c._id.toString() !== commentId,
    );
    await task.save();

    return { message: 'Comment deleted' };
  }
}
