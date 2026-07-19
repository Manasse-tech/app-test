import { IQuery } from '@nestjs/cqrs';

export class GetOrdersByUserQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
