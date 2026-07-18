import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, BadRequestException } from '@nestjs/common';
import { CreateOrderCommand } from './CreateOrderCommand';
import { IOrderRepository, ORDER_REPOSITORY } from '../../domain/repositories/IOrderRepository';
import { Order } from '../../domain/entities/Order';
import { OrderItem } from '../../domain/value-objects/OrderItem';
import { v4 as uuidv4 } from 'uuid';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repository: IOrderRepository
  ) {}

  async execute(command: CreateOrderCommand): Promise<{ id: string }> {
    if (!command.items || command.items.length === 0) {
      throw new BadRequestException('Order must contain at least one item');
    }

    const orderItems = command.items.map(
      (item) => new OrderItem(item.productId, item.quantity, item.unitPrice, item.currency)
    );

    const order = await Order.create(uuidv4(), command.userId, orderItems, command.currency);

    await this.repository.save(order);

    return { id: order.id };
  }
}
