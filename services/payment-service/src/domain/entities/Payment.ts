import { BaseAggregateRoot } from '@nsug/events';
import { PaymentStatus } from '../value-objects/PaymentStatus';
import { PaymentMethod } from '../value-objects/PaymentMethod';
import { PaymentProcessedEvent, PaymentFailedEvent } from '../events/payment.events';

export class Payment extends BaseAggregateRoot {
  private orderId: string;
  private amount: number;
  private currency: string;
  private status: PaymentStatus;
  private method: PaymentMethod;
  private transactionId: string | null;
  private createdAt: Date;
  private updatedAt: Date;

  private constructor(
    id: string,
    orderId: string,
    amount: number,
    currency: string,
    method: PaymentMethod
  ) {
    super(id);
    this.orderId = orderId;
    this.amount = amount;
    this.currency = currency;
    this.method = method;
    this.status = PaymentStatus.PENDING;
    this.transactionId = null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static async create(
    id: string,
    orderId: string,
    amount: number,
    currency: string,
    method: PaymentMethod
  ): Promise<Payment> {
    if (amount <= 0) {
      throw new Error('Payment amount must be greater than 0');
    }
    return new Payment(id, orderId, amount, currency, method);
  }

  static restore(
    id: string,
    orderId: string,
    amount: number,
    currency: string,
    status: PaymentStatus,
    method: PaymentMethod,
    transactionId: string | null
  ): Payment {
    const payment = new Payment(id, orderId, amount, currency, method);
    payment.status = status;
    payment.transactionId = transactionId;
    return payment;
  }

  getOrderId(): string {
    return this.orderId;
  }

  getAmount(): number {
    return this.amount;
  }

  getCurrency(): string {
    return this.currency;
  }

  getStatus(): PaymentStatus {
    return this.status;
  }

  getMethod(): PaymentMethod {
    return this.method;
  }

  getTransactionId(): string | null {
    return this.transactionId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  markAsProcessing(): void {
    if (this.status !== PaymentStatus.PENDING) {
      throw new Error('Only pending payments can be marked as processing');
    }
    this.status = PaymentStatus.PROCESSING;
    this.updatedAt = new Date();
  }

  markAsCompleted(transactionId: string): void {
    if (this.status !== PaymentStatus.PROCESSING) {
      throw new Error('Only payments in processing can be completed');
    }
    this.status = PaymentStatus.COMPLETED;
    this.transactionId = transactionId;
    this.updatedAt = new Date();

    this.addEvent(new PaymentProcessedEvent(this.id, this.orderId, this.amount, this.currency));
  }

  markAsFailed(reason: string): void {
    if ([PaymentStatus.COMPLETED, PaymentStatus.REFUNDED].includes(this.status)) {
      throw new Error('Cannot fail completed or refunded payments');
    }
    this.status = PaymentStatus.FAILED;
    this.updatedAt = new Date();

    this.addEvent(new PaymentFailedEvent(this.id, this.orderId, reason));
  }

  refund(): void {
    if (this.status !== PaymentStatus.COMPLETED) {
      throw new Error('Only completed payments can be refunded');
    }
    this.status = PaymentStatus.REFUNDED;
    this.updatedAt = new Date();
  }
}
