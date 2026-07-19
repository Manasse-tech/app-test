import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetOrdersByUserQuery } from './GetOrdersByUserQuery';
import { IOrderRepository, ORDER_REPOSITORY } from '../../domain/repositories/IOrderRepository';
import { OrderListResponseDto } from '../dtos/order-response.dto';

@QueryHandler(GetOrdersByUserQuery)
export class GetOrdersByUserQueryHandler implements IQueryHandler<GetOrdersByUserQuery> {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repository: IOrderRepository
  ) {}

  async execute(query: GetOrdersByUserQuery): Promise<OrderListResponseDto> {
    const orders = await this.repository.findByUserId(query.userId);

    return {
      total: orders.length,
      items: orders.map((order) => ({
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
