import { randomUUID } from 'crypto';

export abstract class DomainEvent {
  readonly eventId: string = randomUUID();
  readonly occurredAt: Date = new Date();
  readonly aggregateId: string;
  readonly aggregateVersion: number;
  readonly metadata: Record<string, unknown>;

  constructor(aggregateId: string, aggregateVersion: number) {
    this.aggregateId = aggregateId;
    this.aggregateVersion = aggregateVersion;
    this.metadata = {};
  }

  abstract get eventType(): string;
}
