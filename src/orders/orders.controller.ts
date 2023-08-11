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
  ValidationPipe,
} from '@nestjs/common';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { UpdateOrderDto } from '../orders/dto/update-order.dto';
import { CreatePersonDto } from '../orders/dto/create-person.dto';
import { OrdersService } from './orders.service';
import { OrderEntity } from '../orders/schemas/order.schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  getAll(): Promise<OrderEntity[]> {
    return this.orderService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<OrderEntity> {
    return this.orderService.getOne(id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body(new ValidationPipe()) createOrderDto: CreateOrderDto,
  ): Promise<OrderEntity> {
    return this.orderService.create(createOrderDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<OrderEntity> {
    return this.orderService.remove(id);
  }
  @Put(':id')
  update(
    @Body() updateOrderDto: UpdateOrderDto,
    @Param('id') id: string,
  ): Promise<OrderEntity> {
    return this.orderService.update(id, updateOrderDto);
  }
  @Post(':orderId/add-person')
  async addPersonToOrder(
    @Param('orderId') orderId: string,
    @Body() createPersonDto: CreatePersonDto,
  ) {
    return this.orderService.addPersonToOrder(orderId, createPersonDto);
  }
}
