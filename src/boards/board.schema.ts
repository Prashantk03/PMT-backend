import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BoardDocument = Board & Document;

@Schema({ timestamps: true})
export class Board {
    @Prop({ required: true})
    title: string;

    @Prop()
    description: string;

    @Prop({ reuired: true})
    createdBy: string;
}

export const BoardSchema = SchemaFactory.createForClass(Board);