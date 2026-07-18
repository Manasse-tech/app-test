import { DomainEvent } from './DomainEvent';

export interface DomainEventMap {
  [key: string]: DomainEvent;
}

export interface AggregateRoot {
  id: string;
  version: number;
  getUncommittedEvents(): DomainEvent[];
  clearUncommittedEvents(): void;
}

export abstract class BaseAggregateRoot implements AggregateRoot {
  protected uncommittedEvents: DomainEvent[] = [];

  readonly id: string;
  version: number = 1;

  constructor(id: string) {
    this.id = id;
  }

  protected addEvent(event: DomainEvent): void {
    this.uncommittedEvents.push(event);
    this.version++;
  }

  getUncommittedEvents(): DomainEvent[] {
    return this.uncommittedEvents;
  }

  clearUncommittedEvents(): void {
    this.uncommittedEvents = [];
  }
}
