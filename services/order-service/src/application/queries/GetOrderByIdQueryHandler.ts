import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { GetOrderByIdQuery } from './GetOrderByIdQuery';
import { IOrderRepository, ORDER_REPOSITORY } from '../../domain/repositories/IOrderRepository';
import { OrderResponseDto } from '../dtos/order-response.dto';

@QueryHandler(GetOrderByIdQuery)
export class GetOrderByIdQueryHandler implements IQueryHandler<GetOrderByIdQuery> {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repository: IOrderRepository
  ) {}

  async execute(query: GetOrderByIdQuery): Promise<OrderResponseDto> {
    const order = await this.repository.findById(query.id);

    if (!order) {
      throw new NotFoundException(`Order with ID ${query.id} not found`);
    }

    return {
      id: order.id,
      userId: order.getUserId(),
      items: order.getItems().map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        currency: item.currency,
        subtotal: item.getSubtotal(),
      })),
      status: order.getStatus(),
      totalAmount: order.getTotalAmount(),
      currency: order.getCurrency(),
      createdAt: order.getCreatedAt(),
      updatedAt: order.getUpdatedAt(),
    };
  }
}
