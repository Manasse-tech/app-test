import { ICommand } from '@nestjs/cqrs';

export type ProductCurrency = 'XOF' | 'EUR' | 'USD';

export class CreateProductCommand implements ICommand {
  constructor(
    public readonly sku: string,
    public readonly title: string,
    public readonly price: number,
    public readonly currency: ProductCurrency,
    public readonly stock: number
  ) {}
}
