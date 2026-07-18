import { BaseAggregateRoot } from '@nsug/events';
import { Email } from '../value-objects/Email';
import { PasswordHash } from '../value-objects/PasswordHash';
import { UserRegisteredEvent } from '../events/user.events';

export enum UserRole {
  ADMIN = 'admin',
  SELLER = 'seller',
  BUYER = 'buyer',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export class User extends BaseAggregateRoot {
  private email: Email;
  private passwordHash: PasswordHash;
  private role: UserRole;
  private status: UserStatus;
  private createdAt: Date;
  private updatedAt: Date;

  private constructor(id: string, email: Email, passwordHash: PasswordHash, role: UserRole) {
    super(id);
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;
    this.status = UserStatus.ACTIVE;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static async create(
    id: string,
    email: string,
    plainPassword: string,
    role: UserRole = UserRole.BUYER
  ): Promise<User> {
    const emailVo = Email.create(email);
    const passwordHash = await PasswordHash.create(plainPassword);

    const user = new User(id, emailVo, passwordHash, role);
    user.addEvent(new UserRegisteredEvent(id, email, role));

    return user;
  }

  getEmail(): Email {
    return this.email;
  }

  getRole(): UserRole {
    return this.role;
  }

  getStatus(): UserStatus {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  async verifyPassword(plainPassword: string): Promise<boolean> {
    return this.passwordHash.verify(plainPassword);
  }

  isActive(): boolean {
    return this.status === UserStatus.ACTIVE;
  }

  suspend(): void {
    this.status = UserStatus.SUSPENDED;
    this.updatedAt = new Date();
  }

  activate(): void {
    this.status = UserStatus.ACTIVE;
    this.updatedAt = new Date();
  }

  getPasswordHash(): string {
    return this.passwordHash.getHash();
  }

  static restore(
    id: string,
    email: string,
    passwordHash: string,
    role: UserRole,
    status: UserStatus
  ): User {
    const emailVo = Email.create(email);
    const passwordHashVo = PasswordHash.fromHash(passwordHash);
    const user = new User(id, emailVo, passwordHashVo, role);
    user.status = status;
    return user;
  }
}
