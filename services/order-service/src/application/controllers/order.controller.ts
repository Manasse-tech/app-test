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
import { CreateOrderCommand } from '../commands/CreateOrderCommand';
import { GetOrderByIdQuery } from '../queries/GetOrderByIdQuery';
import { ListOrdersQuery } from '../queries/ListOrdersQuery';
import { GetOrdersByUserQuery } from '../queries/GetOrdersByUserQuery';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderResponseDto, OrderListResponseDto } from '../dtos/order-response.dto';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() dto: CreateOrderDto): Promise<{ id: string }> {
    return this.commandBus.execute(new CreateOrderCommand(dto.userId, dto.items, dto.currency));
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<OrderResponseDto> {
    return this.queryBus.execute(new GetOrderByIdQuery(id));
  }

  @Get()
  async list(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10
  ): Promise<OrderListResponseDto> {
    return this.queryBus.execute(new ListOrdersQuery(page, limit));
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string): Promise<OrderListResponseDto> {
    return this.queryBus.execute(new GetOrdersByUserQuery(userId));
  }
}
