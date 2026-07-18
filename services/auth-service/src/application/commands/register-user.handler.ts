import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from './auth.commands';
import { IUserRepository, USER_REPOSITORY } from '../../domain/repositories/IUserRepository';
import { User, UserRole } from '../../domain/entities/User';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcryptjs';

@Injectable()
@CommandHandler(RegisterUserCommand)
export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(command: RegisterUserCommand): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(command.email);
    if (existingUser) {
      throw new Error(`User with email ${command.email} already exists`);
    }

    const userId = randomUUID();

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(command.password, salt);
    const user = await User.create(userId, command.email, hashedPassword, UserRole.BUYER);

    await this.userRepository.save(user);
  }
}
