import { ICommand } from '@nestjs/cqrs';

export class CreateProductCommand implements ICommand {
  constructor(
    public readonly sku: string,
    public readonly title: string,
    public readonly price: number,
    public readonly currency: string,
    public readonly stock: number
  ) {}
}
