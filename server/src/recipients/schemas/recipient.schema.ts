import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type RecepientDocument = HydratedDocument<Recipient>;
@Schema()
export class Recipient {
  @Prop()
  name: string;

  @Prop()
  phone: number;
}

export const RecipientSchema = SchemaFactory.createForClass(Recipient);
