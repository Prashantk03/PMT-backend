import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardSchema } from './board.schema';
import { BoardsController } from './boards.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema}]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [BoardsService],
})

export class BoardsModule {}
