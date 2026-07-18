import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ErrorHandlingModule } from '@nsug/shared/error-handling/error-handling.module';
import { OrderEntity } from '../persistence/order.entity';
import { OrderController } from '../../application/controllers/order.controller';
import { CreateOrderCommandHandler } from '../../application/commands/CreateOrderCommandHandler';
import { GetOrderByIdQueryHandler } from '../../application/queries/GetOrderByIdQueryHandler';
import { TypeOrmOrderRepository } from '../repositories/TypeOrmOrderRepository';
import { ORDER_REPOSITORY } from '../../domain/repositories/IOrderRepository';

@Module({
  imports: [ErrorHandlingModule, TypeOrmModule.forFeature([OrderEntity]), CqrsModule],
  controllers: [OrderController],
  providers: [
    CreateOrderCommandHandler,
    GetOrderByIdQueryHandler,
    {
      provide: ORDER_REPOSITORY,
      useClass: TypeOrmOrderRepository,
    },
  ],
})
export class OrderModule {}
