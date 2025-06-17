import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() dto: CreateTaskDto) {
        const userId = 'dummyUserId';
        return this.tasksService.create(dto, userId);
    }

    @Get()
    async getByBoard(@Query('boardId') boardId: string){
        return this.tasksService.findByBoard(boardId);
    }
}
