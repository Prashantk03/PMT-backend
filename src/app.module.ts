import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://kumarprashant71037:mongo8256db@cluster0.0gejdbf.mongodb.net/'),
    AuthModule,
    UsersModule,
    BoardsModule,
    TasksModule,
  ],
})

export class AppModule {}
