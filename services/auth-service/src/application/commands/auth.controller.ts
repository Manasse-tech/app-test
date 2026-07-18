import { Controller, Post, Body, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterUserCommand } from './auth.commands';
import { LoginUserCommand } from './LoginUserCommand';
import { GetUserByIdQuery } from '../queries/get-user-by-id.query';

interface AuthCredentialsDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() dto: AuthCredentialsDto): Promise<unknown> {
    return this.commandBus.execute(new RegisterUserCommand(dto.email, dto.password));
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() dto: AuthCredentialsDto): Promise<unknown> {
    return this.commandBus.execute(new LoginUserCommand(dto.email, dto.password));
  }

  @Get('me/:id')
  async getMe(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }

  // Prochaine étape : POST /auth/login avec génération de JWT
}
