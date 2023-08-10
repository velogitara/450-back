import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { UpdateOrderDto } from '../orders/dto/update-order.dto';

import { Order, OrderDocument } from '../orders/schemas/order.schema';
@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  async getAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }
  async getOne(id: string): Promise<Order> {
    return this.orderModel.findById(id);
  }
  async create(userDto: CreateOrderDto): Promise<Order> {
    const newRecipient = new this.orderModel(userDto);
    return newRecipient.save();
  }
  async remove(id: string): Promise<Order> {
    return this.orderModel.findByIdAndRemove(id);
  }
  async update(id: string, userDto: UpdateOrderDto): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(id, userDto, {
      new: true,
    });
  }
}
