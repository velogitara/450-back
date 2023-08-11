import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  // IsArray,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // If using Swagger for API documentation
import { Transform, Type } from 'class-transformer';
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

class Person {
  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  patronymic_name: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  building: string;

  @ApiProperty()
  apartment: string;

  @ApiProperty()
  birthCertificate: string;

  @ApiProperty()
  regionFrom: string; // Replace with the appropriate type, e.g., ObjectId

  @ApiProperty()
  settlementFrom: string; // Replace with the appropriate type, e.g., ObjectId

  @ApiProperty()
  memberNumber: number;

  @ApiProperty()
  phone: string;
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

  @ApiProperty({ type: [Person] }) // Use @ApiProperty({ type: [Person] }) to indicate an array of persons
  // @IsArray()
  @ValidateNested({ each: true }) // Validate each item in the array using the Person class
  @Type(() => Person)
  persons: Person[];
}
