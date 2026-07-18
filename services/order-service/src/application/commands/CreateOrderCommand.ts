import { ICommand } from '@nestjs/cqrs';

export interface CreateOrderItemDto {
  productId: string;
  quantity: number;
  unitPrice: number;
  currency: string;
}

export class CreateOrderCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly items: CreateOrderItemDto[],
    public readonly currency: string = 'USD'
  ) {}
}
