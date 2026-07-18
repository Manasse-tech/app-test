import { DomainEvent } from '@nsug/events';

export class ProductCreatedEvent extends DomainEvent {
  constructor(
    public readonly productId: string,
    public readonly sku: string,
    public readonly title: string,
    public readonly price: number,
    public readonly currency: string
  ) {
    super(productId, 1);
  }

  get eventType(): string {
    return 'PRODUCT_CREATED';
  }
}

export class ProductStockUpdatedEvent extends DomainEvent {
  constructor(
    public readonly productId: string,
    public readonly stockQuantity: number,
    public readonly operation: 'add' | 'remove'
  ) {
    super(productId, 1);
  }

  get eventType(): string {
    return 'PRODUCT_STOCK_UPDATED';
  }
}
