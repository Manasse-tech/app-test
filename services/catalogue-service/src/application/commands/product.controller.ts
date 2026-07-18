import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from './CreateProductCommand';
import { GetProductByIdQuery } from '../queries/GetProductByIdQuery';
import { Inject } from '@nestjs/common';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../domain/repositories/IProductRepository';

@Controller('products')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(PRODUCT_REPOSITORY)
    private readonly repository: IProductRepository
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: any) {
    return this.commandBus.execute(
      new CreateProductCommand(dto.sku, dto.title, dto.price, dto.currency, dto.stock || 0)
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.queryBus.execute(new GetProductByIdQuery(id));
  }

  @Get()
  async list(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.repository.list(page, limit);
  }
}
