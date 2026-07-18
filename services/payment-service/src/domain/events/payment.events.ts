import { DomainEvent } from '@nsug/events';

export class PaymentProcessedEvent extends DomainEvent {
  constructor(
    public readonly paymentId: string,
    public readonly orderId: string,
    public readonly amount: number,
    public readonly currency: string
  ) {
    super(paymentId, 1);
  }

  get eventType(): string {
    return 'PAYMENT_PROCESSED';
  }
}

export class PaymentFailedEvent extends DomainEvent {
  constructor(
    public readonly paymentId: string,
    public readonly orderId: string,
    public readonly reason: string
  ) {
    super(paymentId, 1);
  }

  get eventType(): string {
    return 'PAYMENT_FAILED';
  }
}

export class PaymentRefundedEvent extends DomainEvent {
  constructor(public readonly paymentId: string) {
    super(paymentId, 1);
  }

  get eventType(): string {
    return 'PAYMENT_REFUNDED';
  }
}
