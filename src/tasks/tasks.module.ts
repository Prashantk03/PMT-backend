import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task.schema';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Board, BoardSchema } from 'src/boards/board.schema';

@Module({
    imports: [MongooseModule.forFeature([
        { name: Task.name, schema: TaskSchema},
        { name: Board.name, schema: BoardSchema},
    ])],
    controllers: [TasksController],
    providers: [TasksService],
    exports: [TasksService]
})
export class TasksModule {}
