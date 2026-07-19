import { BaseAggregateRoot } from '@nsug/events';
import { OrderStatus } from '../value-objects/OrderStatus';
import { OrderItem } from '../value-objects/OrderItem';
import { OrderCreatedEvent } from '../events/order.events';

export class Order extends BaseAggregateRoot {
  private userId: string;
  private items: OrderItem[];
  private status: OrderStatus;
  private totalAmount: number;
  private currency: string;
  private createdAt: Date;
  private updatedAt: Date;

  private constructor(
    id: string,
    userId: string,
    items: OrderItem[],
    totalAmount: number,
    currency: string
  ) {
    super(id);
    this.userId = userId;
    this.items = items;
    this.status = OrderStatus.PENDING;
    this.totalAmount = totalAmount;
    this.currency = currency;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static create(id: string, userId: string, items: OrderItem[], currency: string = 'USD'): Order {
    if (!items || items.length === 0) {
      throw new Error('Order must contain at least one item');
    }

    const totalAmount = items.reduce((sum, item) => sum + item.getSubtotal(), 0);
    const order = new Order(id, userId, items, totalAmount, currency);

    order.addEvent(new OrderCreatedEvent(id, userId, items.length, totalAmount, currency));

    return order;
  }

  static restore(
    id: string,
    userId: string,
    items: OrderItem[],
    status: OrderStatus,
    totalAmount: number,
    currency: string,
    createdAt: Date,
    updatedAt: Date
  ): Order {
    const order = new Order(id, userId, items, totalAmount, currency);
    order.status = status;
    order.createdAt = createdAt;
    order.updatedAt = updatedAt;
    return order;
  }

  getUserId(): string {
    return this.userId;
  }

  getItems(): OrderItem[] {
    return this.items;
  }

  getStatus(): OrderStatus {
    return this.status;
  }

  getTotalAmount(): number {
    return this.totalAmount;
  }

  getCurrency(): string {
    return this.currency;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  confirmOrder(): void {
    if (this.status !== OrderStatus.PENDING) {
      throw new Error('Only pending orders can be confirmed');
    }
    this.status = OrderStatus.CONFIRMED;
    this.updatedAt = new Date();
  }

  startPaymentProcessing(): void {
    if (this.status !== OrderStatus.CONFIRMED) {
      throw new Error('Only confirmed orders can start payment processing');
    }
    this.status = OrderStatus.PAYMENT_PROCESSING;
    this.updatedAt = new Date();
  }

  completePayment(): void {
    if (this.status !== OrderStatus.PAYMENT_PROCESSING) {
      throw new Error('Only orders in payment processing can complete payment');
    }
    this.status = OrderStatus.PAYMENT_COMPLETED;
    this.updatedAt = new Date();
  }

  cancel(): void {
    if ([OrderStatus.SHIPPED, OrderStatus.DELIVERED].includes(this.status)) {
      throw new Error('Cannot cancel shipped or delivered orders');
    }
    this.status = OrderStatus.CANCELLED;
    this.updatedAt = new Date();
  }
}
