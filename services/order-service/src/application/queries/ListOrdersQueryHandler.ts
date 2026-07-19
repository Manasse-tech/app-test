import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListOrdersQuery } from './ListOrdersQuery';
import { IOrderRepository, ORDER_REPOSITORY } from '../../domain/repositories/IOrderRepository';
import { OrderListResponseDto } from '../dtos/order-response.dto';

@QueryHandler(ListOrdersQuery)
export class ListOrdersQueryHandler implements IQueryHandler<ListOrdersQuery> {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repository: IOrderRepository
  ) {}

  async execute(query: ListOrdersQuery): Promise<OrderListResponseDto> {
    const result = await this.repository.list(query.page, query.limit);

    return {
      total: result.total,
      items: result.items.map((order) => ({
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
      })),
    };
  }
}
