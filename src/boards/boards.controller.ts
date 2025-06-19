import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('boards')
export class BoardsController {
    constructor(private readonly boardsService: BoardsService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() dto: CreateBoardDto, @Request() req){
        return this.boardsService.create(dto, req.user.userId);
    }

    @Get()
    async findAll(){
        return this.boardsService.findAll();
    }
}
