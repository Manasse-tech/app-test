export enum PaymentMethodType {
  STRIPE = 'stripe',
  WAVE = 'wave',
  BANK_TRANSFER = 'bank_transfer',
  CRYPTO = 'crypto',
}

export class PaymentMethod {
  constructor(
    public readonly type: PaymentMethodType,
    public readonly details: Record<string, any>
  ) {
    if (!type) {
      throw new Error('Payment method type is required');
    }
  }

  getType(): PaymentMethodType {
    return this.type;
  }

  getDetails(): Record<string, any> {
    return this.details;
  }
}
