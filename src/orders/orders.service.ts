import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { UpdateOrderDto } from '../orders/dto/update-order.dto';
import { CreatePersonDto } from '../orders/dto/create-person.dto';

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
  async getOne(orderId: string): Promise<OrderEntity> {
    return this.orderModel.findById(orderId);
  }
  async create(orderDto: CreateOrderDto): Promise<OrderEntity> {
    // const newOrder = new this.orderModel(orderDto);
    // return newOrder.save();
    return this.orderModel.create(orderDto);
  }
  async remove(orderId: string): Promise<OrderEntity> {
    return this.orderModel.findByIdAndRemove(orderId);
  }
  async update(orderId: string, userDto: UpdateOrderDto): Promise<OrderEntity> {
    return this.orderModel.findByIdAndUpdate(orderId, userDto, {
      new: true,
    });
  }
  async addPersonToOrder(
    orderId: string,
    createPersonDto: CreatePersonDto,
  ): Promise<OrderEntity> {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.persons.push(createPersonDto);

    return order.save();
  }
}
