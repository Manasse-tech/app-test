import { Command } from '../command/Command';

export class RegisterUserCommand extends Command {
  readonly email: string;
  readonly password: string;

  constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
  }

  get commandType(): string {
    return 'REGISTER_USER';
  }
}

export class AuthenticateUserCommand extends Command {
  readonly email: string;
  readonly password: string;

  constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
  }

  get commandType(): string {
    return 'AUTHENTICATE_USER';
  }
}
