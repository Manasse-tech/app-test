import { IQuery } from '@nestjs/cqrs';

export class ListProductsQuery implements IQuery {
  constructor(
    public readonly page = 1,
    public readonly limit = 10
  ) {}
}
