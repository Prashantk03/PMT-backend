import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

    async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
        return this.taskModel.create({ ...createTaskDto, createdBy: userId });
    }

    async findByBoard(boardId: string): Promise<Task[]> {
        return this.taskModel.find({ boardId }).exec();
    }
}
