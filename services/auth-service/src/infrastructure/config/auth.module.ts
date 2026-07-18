import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ErrorHandlingModule } from '@nsug/shared/error-handling/error-handling.module';
import { UserEntity } from '../persistence/user.entity';
import { AuthController } from '../../application/commands/auth.controller';
import { RegisterUserCommandHandler } from '../../application/commands/register-user.handler';
import { LoginUserCommandHandler } from '../../application/commands/LoginUserCommandHandler';
import { GetUserByIdQueryHandler } from '../../application/queries/get-user-by-id.handler';
import { TypeOrmUserRepository } from '../repositories/TypeOrmUserRepository';
import { USER_REPOSITORY } from '../../domain/repositories/IUserRepository';

@Module({
  imports: [
    ErrorHandlingModule,
    TypeOrmModule.forFeature([UserEntity]),
    CqrsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'nsug_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    RegisterUserCommandHandler,
    LoginUserCommandHandler,
    GetUserByIdQueryHandler,
    {
      provide: USER_REPOSITORY,
      useClass: TypeOrmUserRepository,
    },
  ],
})
export class AuthModule {}
