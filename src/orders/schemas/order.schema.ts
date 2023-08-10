import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OrderType, OrderStatus, OrderCategory } from '../dto/create-order.dto';

export type OrderDocument = HydratedDocument<OrderEntity>;
@Schema()
export class OrderEntity {
  @Prop({ required: true })
  maxQuantity: number;

  @Prop({ type: String, enum: OrderType, required: true })
  type: OrderType[];

  @Prop({ type: String, enum: OrderStatus, required: true })
  status: OrderStatus[];

  @Prop({ type: Date, default: Date.now() })
  createDate: Date;

  @Prop({ type: Date, default: Date.now() })
  changedDate: Date;

  @Prop({ type: Date, default: Date.now() })
  closeDate: Date;

  @Prop({ type: String, enum: OrderCategory, required: true })
  category: OrderCategory[];
}

export const OrderSchema = SchemaFactory.createForClass(OrderEntity);
