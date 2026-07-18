import { DomainEvent } from '@nsug/events';

export class OrderCreatedEvent extends DomainEvent {
  constructor(
    public readonly orderId: string,
    public readonly userId: string,
    public readonly itemCount: number,
    public readonly totalAmount: number,
    public readonly currency: string
  ) {
    super(orderId, 1);
  }

  get eventType(): string {
    return 'ORDER_CREATED';
  }
}

export class OrderConfirmedEvent extends DomainEvent {
  constructor(public readonly orderId: string) {
    super(orderId, 1);
  }

  get eventType(): string {
    return 'ORDER_CONFIRMED';
  }
}

export class OrderPaymentCompletedEvent extends DomainEvent {
  constructor(public readonly orderId: string) {
    super(orderId, 1);
  }

  get eventType(): string {
    return 'ORDER_PAYMENT_COMPLETED';
  }
}

export class OrderCancelledEvent extends DomainEvent {
  constructor(public readonly orderId: string) {
    super(orderId, 1);
  }

  get eventType(): string {
    return 'ORDER_CANCELLED';
  }
}
