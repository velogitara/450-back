import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // If using Swagger for API documentation
import { Transform } from 'class-transformer';
export enum OrderType {
  TempMoved = 'temp_moved',
  Invalid = 'invalid',
  Child = 'child',
}

export enum OrderStatus {
  Active = 'active',
  Archive = 'archive',
}

export enum OrderCategory {
  Children = 'children',
  InvalidPerson = 'invalidPerson',
  TempMovePerson = 'tempMovePerson',
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  maxQuantity: number;

  @IsEnum(OrderType, { each: true })
  @ApiProperty({ enum: OrderType, enumName: 'OrderType', isArray: true })
  type: OrderType[];

  @IsEnum(OrderStatus, { each: true })
  @ApiProperty({ enum: OrderStatus, enumName: 'OrderStatus', isArray: true })
  status: OrderStatus[];

  // @IsDateString()
  @ApiProperty({ type: Date })
  @Transform(({ value }) => value || new Date().toISOString())
  createDate: Date;

  // @IsDateString()
  @ApiProperty({ type: Date })
  @Transform(({ value }) => value || new Date().toISOString())
  changedDate: Date;

  // @IsDateString()
  @ApiProperty({ type: Date })
  @Transform(({ value }) => value || new Date().toISOString())
  closeDate: Date;

  @IsEnum(OrderCategory, { each: true })
  @ApiProperty({
    enum: OrderCategory,
    enumName: 'OrderCategory',
    isArray: true,
  })
  category: OrderCategory[];
}
