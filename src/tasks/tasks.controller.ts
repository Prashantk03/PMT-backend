import { Controller, Post, Get, Body, Query, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateTaskDto, @Request() req) {
        return this.tasksService.create(dto, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getByBoard(@Query('boardId') boardId: string, @Request() req) {
        return this.tasksService.findByBoard(boardId, req.user.userId);
    }

}
