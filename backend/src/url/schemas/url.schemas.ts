import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class URL extends Document {
  @Prop()
  originalURL: string;

  @Prop()
  shortURL: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  author: Types.ObjectId;
}

export const URLSchema = SchemaFactory.createForClass(URL);
