import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('boards')
export class BoardsController {
    constructor(private readonly boardsService: BoardsService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() dto: CreateBoardDto){
        const userId = 'dummyUserId';
        return this.boardsService.create(dto, userId);
    }

    @Get()
    async findAll(){
        return this.boardsService.findAll();
    }
}
