import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { GetPaymentByIdQuery } from './GetPaymentByIdQuery';
import {
  IPaymentRepository,
  PAYMENT_REPOSITORY,
} from '../../domain/repositories/IPaymentRepository';

@QueryHandler(GetPaymentByIdQuery)
export class GetPaymentByIdQueryHandler implements IQueryHandler<GetPaymentByIdQuery> {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly repository: IPaymentRepository
  ) {}

  async execute(query: GetPaymentByIdQuery): Promise<any> {
    const payment = await this.repository.findById(query.id);

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${query.id} not found`);
    }

    const method = payment.getMethod();

    return {
      id: payment.id,
      orderId: payment.getOrderId(),
      amount: payment.getAmount(),
      currency: payment.getCurrency(),
      status: payment.getStatus(),
      methodType: method.getType(),
      transactionId: payment.getTransactionId(),
    };
  }
}
