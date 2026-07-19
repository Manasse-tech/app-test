import { ICommand } from '@nestjs/cqrs';

export type OrderCurrency = 'XOF' | 'EUR' | 'USD';

export interface CreateOrderItemDto {
  productId: string;
  quantity: number;
  unitPrice: number;
  currency: OrderCurrency;
}

export class CreateOrderCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly items: CreateOrderItemDto[],
    public readonly currency: OrderCurrency = 'USD'
  ) {}
}
