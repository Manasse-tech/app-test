import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from './LoginUserCommand';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { JwtService } from '@nestjs/jwt';

@CommandHandler(LoginUserCommand)
export class LoginUserCommandHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService
  ) {}

  async execute(command: LoginUserCommand): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findByEmail(command.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await user.verifyPassword(command.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.getEmail().getValue(),
      role: user.getRole(),
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
