import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ProcessPaymentCommand } from './ProcessPaymentCommand';
import {
  IPaymentRepository,
  PAYMENT_REPOSITORY,
} from '../../domain/repositories/IPaymentRepository';
import { Payment } from '../../domain/entities/Payment';
import { PaymentMethod } from '../../domain/value-objects/PaymentMethod';
import { v4 as uuidv4 } from 'uuid';

@CommandHandler(ProcessPaymentCommand)
export class ProcessPaymentCommandHandler implements ICommandHandler<ProcessPaymentCommand> {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly repository: IPaymentRepository
  ) {}

  async execute(command: ProcessPaymentCommand): Promise<{ id: string }> {
    const method = new PaymentMethod(command.methodType, command.methodDetails);

    const payment = await Payment.create(
      uuidv4(),
      command.orderId,
      command.amount,
      command.currency,
      method
    );

    payment.markAsProcessing();

    // Simulate payment processing (in real scenario, would call payment gateway)
    const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    payment.markAsCompleted(transactionId);

    await this.repository.save(payment);

    return { id: payment.id };
  }
}
