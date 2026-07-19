import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, Min, IsOptional, IsInt, IsIn } from 'class-validator';

export type ProductCurrency = 'XOF' | 'EUR' | 'USD';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  sku!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price!: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['XOF', 'EUR', 'USD'])
  currency!: ProductCurrency;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  stock?: number = 0;
}
