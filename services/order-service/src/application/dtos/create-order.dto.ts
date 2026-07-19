import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsArray,
  ArrayMinSize,
  IsEnum,
  IsInt,
  Min,
  IsNumber,
} from 'class-validator';

export enum OrderCurrency {
  XOF = 'XOF',
  EUR = 'EUR',
  USD = 'USD',
}

export class CreateOrderItemDto {
  @IsString()
  @IsNotEmpty()
  productId!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  unitPrice!: number;

  @IsEnum(OrderCurrency)
  currency!: OrderCurrency;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @ArrayMinSize(1)
  items!: CreateOrderItemDto[];

  @IsEnum(OrderCurrency)
  currency: OrderCurrency = OrderCurrency.USD;
}
