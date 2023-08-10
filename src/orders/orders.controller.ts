import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { UpdateOrderDto } from '../orders/dto/update-order.dto';
import { OrdersService } from './orders.service';
import { Order } from '../orders/schemas/order.schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  getAll(): Promise<Order[]> {
    return this.orderService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOne(id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Order> {
    return this.orderService.remove(id);
  }
  @Put(':id')
  update(
    @Body() updateOrderDto: UpdateOrderDto,
    @Param('id') id: string,
  ): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }
}
