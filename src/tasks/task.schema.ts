import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type TaskDocument = Task & Document;

// Comment Schema
@Schema({ _id: true })
export class Comment {
  _id?: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  author: string;

  @Prop({ default: () => new Date() })
  createdAt: Date;

  @Prop({ required: true })
  authorId: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

// Task Schema
@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  boardId: string;

  @Prop({ default: 'todo' })
  status: string;

  @Prop()
  assignedTo: string;

  @Prop()
  dueDate: Date;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ type: [CommentSchema], default: [] })
  comments: Comment[];
}


export const TaskSchema = SchemaFactory.createForClass(Task);
