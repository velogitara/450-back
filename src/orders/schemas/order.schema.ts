import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type OrderDocument = HydratedDocument<Order>;
@Schema()
export class Order {
  @Prop()
  name: string;

  @Prop()
  phone: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
