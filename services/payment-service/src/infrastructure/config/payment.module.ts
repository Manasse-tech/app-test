import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ErrorHandlingModule } from '@nsug/shared/error-handling/error-handling.module';
import { PaymentEntity } from '../persistence/payment.entity';
import { PaymentController } from '../../application/controllers/payment.controller';
import { ProcessPaymentCommandHandler } from '../../application/commands/ProcessPaymentCommandHandler';
import { GetPaymentByIdQueryHandler } from '../../application/queries/GetPaymentByIdQueryHandler';
import { TypeOrmPaymentRepository } from '../repositories/TypeOrmPaymentRepository';
import { PAYMENT_REPOSITORY } from '../../domain/repositories/IPaymentRepository';

@Module({
  imports: [ErrorHandlingModule, TypeOrmModule.forFeature([PaymentEntity]), CqrsModule],
  controllers: [PaymentController],
  providers: [
    ProcessPaymentCommandHandler,
    GetPaymentByIdQueryHandler,
    {
      provide: PAYMENT_REPOSITORY,
      useClass: TypeOrmPaymentRepository,
    },
  ],
})
export class PaymentModule {}
