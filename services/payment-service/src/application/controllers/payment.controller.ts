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
import { ProcessPaymentCommand } from '../commands/ProcessPaymentCommand';
import { GetPaymentByIdQuery } from '../queries/GetPaymentByIdQuery';
import { Inject } from '@nestjs/common';
import {
  IPaymentRepository,
  PAYMENT_REPOSITORY,
} from '../../domain/repositories/IPaymentRepository';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(PAYMENT_REPOSITORY)
    private readonly repository: IPaymentRepository
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async process(@Body() dto: any) {
    return this.commandBus.execute(
      new ProcessPaymentCommand(
        dto.orderId,
        dto.amount,
        dto.currency,
        dto.methodType,
        dto.methodDetails || {}
      )
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.queryBus.execute(new GetPaymentByIdQuery(id));
  }

  @Get()
  async list(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.repository.list(page, limit);
  }

  @Get('order/:orderId')
  async findByOrderId(@Param('orderId') orderId: string) {
    return this.repository.findByOrderId(orderId);
  }
}
