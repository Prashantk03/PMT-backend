import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Param,
  NotFoundException,
  Delete
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateBoardDto, @Request() req) {
    return this.boardsService.create(dto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const board = await this.boardsService.findById(id);
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    return board;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findUserBoards(@Request() req) {
    return this.boardsService.findByUser(req.user.userId);
  }

   @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
      return this.boardsService.remove(id, req.user.userId);
    }
}
