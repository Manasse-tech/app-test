export class OrderProcessingSaga {
  constructor(
    private readonly kafkaClient: {
      emit(topic: string, payload: Record<string, unknown>): Promise<void>;
    },
    private readonly eventStore: {
      append(
        stream: string,
        aggregateId: string,
        eventType: string,
        payload: Record<string, unknown>
      ): Promise<void>;
    }
  ) {}

  async onOrderCreated(event: {
    data: { orderId: string; items: unknown[] };
    tenantId: string;
  }): Promise<void> {
    try {
      await this.kafkaClient.emit('inventory.reserve-stock', {
        orderId: event.data.orderId,
        items: event.data.items,
        tenantId: event.tenantId,
      });
    } catch (error) {
      await this.executeCompensatingRoutine(event.data.orderId, 'STOCK_ERROR');
    }
  }

  async onPaymentFailed(event: { data: { orderId: string } }): Promise<void> {
    await this.executeCompensatingRoutine(event.data.orderId, 'PAYMENT_REJECTED');
  }

  private async executeCompensatingRoutine(orderId: string, reason: string): Promise<void> {
    await this.kafkaClient.emit('inventory.release-stock', { orderId, reason });
    await this.eventStore.append('order', orderId, 'OrderCancelledEvent', { orderId, reason });
  }
}
