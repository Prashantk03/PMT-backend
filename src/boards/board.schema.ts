import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type BoardDocument = Board & Document;

@Schema({ timestamps: true })
export class Board {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ reuired: true })
  createdBy: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  members: Types.ObjectId[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
