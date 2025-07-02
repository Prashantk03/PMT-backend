import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UseGuards,
  Request,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateTaskDto>,
    @Request() req,
  ) {
    return this.tasksService.update(id, dto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.tasksService.remove(id, req.user.userId);
  }

  // Comment route
  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  async addComment(
    @Param('id') taskId: string,
    @Body('text') text: string,
    @Request() req
  ) {
    return this.tasksService.addComment(taskId, {
      text,
      author: req.user.email,
    })
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':taskId/comments/:commentId')
  async deleteComment(
    @Param('taskId') taskId: string,
    @Param('commentId') commentId: string,
    @Request() req
  ){
    return this.tasksService.deleteComment(taskId, commentId, req.user.userId);
  }
}
