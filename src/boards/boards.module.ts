import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardSchema } from './board.schema';
import { BoardsController } from './boards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema},
      { name: User.name, schema: UserSchema},
    ]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [BoardsService],
})

export class BoardsModule {}
