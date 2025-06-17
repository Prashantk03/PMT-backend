import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TaskDocument = Task & Document;

@Schema({ timestamps: true})
export class Task {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    boardId: string;

    @Prop({ default: 'todo'})
    status: string;

    @Prop()
    assignedTo: string;

    @Prop()
    dueDate: Date;

    @Prop({ required: true })
    createdBy: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);