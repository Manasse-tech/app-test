import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../domain/repositories/IProductRepository';
import { ListProductsQuery } from './ListProductsQuery';
import { ProductListResponseDto } from '../dtos/product-response.dto';

@QueryHandler(ListProductsQuery)
export class ListProductsQueryHandler implements IQueryHandler<ListProductsQuery> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repository: IProductRepository
  ) {}

  async execute(query: ListProductsQuery): Promise<ProductListResponseDto> {
    const result = await this.repository.list(query.page, query.limit);

    return {
      total: result.total,
      items: result.items.map((product) => ({
        id: product.id,
        sku: product.getSKU().getValue(),
        title: product.getTitle(),
        price: product.getPrice().getAmount(),
        currency: product.getPrice().getCurrency(),
        stock: product.getStock(),
        createdAt: product.getCreatedAt(),
        updatedAt: product.getUpdatedAt(),
      })),
    };
  }
}
