import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { UpdateOrderDto } from '../orders/dto/update-order.dto';

import { OrderEntity, OrderDocument } from '../orders/schemas/order.schema';
@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(OrderEntity.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  async getAll(): Promise<OrderEntity[]> {
    return this.orderModel.find().exec();
  }
  async getOne(id: string): Promise<OrderEntity> {
    return this.orderModel.findById(id);
  }
  async create(orderDto: CreateOrderDto): Promise<OrderEntity> {
    const newOrder = new this.orderModel(orderDto);
    return newOrder.save();
  }
  async remove(id: string): Promise<OrderEntity> {
    return this.orderModel.findByIdAndRemove(id);
  }
  async update(id: string, userDto: UpdateOrderDto): Promise<OrderEntity> {
    return this.orderModel.findByIdAndUpdate(id, userDto, {
      new: true,
    });
  }
}
