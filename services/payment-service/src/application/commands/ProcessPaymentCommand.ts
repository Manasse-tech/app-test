import { ICommand } from '@nestjs/cqrs';
import { PaymentMethodType } from '../../domain/value-objects/PaymentMethod';

export class ProcessPaymentCommand implements ICommand {
  constructor(
    public readonly orderId: string,
    public readonly amount: number,
    public readonly currency: string,
    public readonly methodType: PaymentMethodType,
    public readonly methodDetails: Record<string, any>
  ) {}
}
