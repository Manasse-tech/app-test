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
import { CreateOrderCommand } from '../commands/CreateOrderCommand';
import { GetOrderByIdQuery } from '../queries/GetOrderByIdQuery';
import { Inject } from '@nestjs/common';
import { IOrderRepository, ORDER_REPOSITORY } from '../../domain/repositories/IOrderRepository';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(ORDER_REPOSITORY)
    private readonly repository: IOrderRepository
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: any) {
    return this.commandBus.execute(
      new CreateOrderCommand(dto.userId, dto.items, dto.currency || 'USD')
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.queryBus.execute(new GetOrderByIdQuery(id));
  }

  @Get()
  async list(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.repository.list(page, limit);
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    return this.repository.findByUserId(userId);
  }
}
