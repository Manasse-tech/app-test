import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, ConflictException } from '@nestjs/common';
import { CreateProductCommand } from './CreateProductCommand';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';
import { v4 as uuidv4 } from 'uuid';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler implements ICommandHandler<CreateProductCommand> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repository: IProductRepository
  ) {}

  async execute(command: CreateProductCommand): Promise<{ id: string }> {
    const existing = await this.repository.findBySKU(command.sku);
    if (existing) {
      throw new ConflictException(`Product with SKU ${command.sku} already exists`);
    }

    const product = Product.create(
      uuidv4(),
      command.sku,
      command.title,
      command.price,
      command.currency
    );

    if (command.stock > 0) {
      product.addStock(command.stock);
    }

    await this.repository.save(product);

    return { id: product.id };
  }
}
