import { DomainEvent } from '@nsug/events';

export class UserRegisteredEvent extends DomainEvent {
  readonly userId: string;
  readonly email: string;
  readonly role: string;

  constructor(userId: string, email: string, role: string) {
    super(userId, 1);
    this.userId = userId;
    this.email = email;
    this.role = role;
  }

  get eventType(): string {
    return 'USER_REGISTERED';
  }
}

export class UserAuthenticatedEvent extends DomainEvent {
  readonly userId: string;
  readonly email: string;
  readonly timestamp: Date;

  constructor(userId: string, email: string) {
    super(userId, 1);
    this.userId = userId;
    this.email = email;
    this.timestamp = new Date();
  }

  get eventType(): string {
    return 'USER_AUTHENTICATED';
  }
}
