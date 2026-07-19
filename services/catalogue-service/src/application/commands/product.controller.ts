import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from './CreateProductCommand';
import { GetProductByIdQuery } from '../queries/GetProductByIdQuery';
import { ListProductsQuery } from '../queries/ListProductsQuery';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductResponseDto, ProductListResponseDto } from '../dtos/product-response.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() dto: CreateProductDto): Promise<{ id: string }> {
    return this.commandBus.execute(
      new CreateProductCommand(dto.sku, dto.title, dto.price, dto.currency, dto.stock ?? 0)
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ProductResponseDto> {
    return this.queryBus.execute(new GetProductByIdQuery(id));
  }

  @Get()
  async list(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10
  ): Promise<ProductListResponseDto> {
    return this.queryBus.execute(new ListProductsQuery(page, limit));
  }
}
