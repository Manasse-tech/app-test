import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { GetProductByIdQuery } from './GetProductByIdQuery';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../domain/repositories/IProductRepository';
import { ProductResponseDto } from '../dtos/product-response.dto';

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdQueryHandler implements IQueryHandler<GetProductByIdQuery> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repository: IProductRepository
  ) {}

  async execute(query: GetProductByIdQuery): Promise<ProductResponseDto> {
    const product = await this.repository.findById(query.id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${query.id} not found`);
    }

    return {
      id: product.id,
      sku: product.getSKU().getValue(),
      title: product.getTitle(),
      price: product.getPrice().getAmount(),
      currency: product.getPrice().getCurrency(),
      stock: product.getStock(),
      createdAt: product.getCreatedAt(),
      updatedAt: product.getUpdatedAt(),
    };
  }
}
