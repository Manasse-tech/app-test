export class Price {
  private readonly amount: number;
  private readonly currency: string;

  private constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency.toUpperCase();
  }

  static create(amount: number, currency: string): Price {
    if (amount < 0) {
      throw new Error('Price cannot be negative');
    }
    if (!currency || currency.trim().length === 0) {
      throw new Error('Currency is required');
    }
    if (currency.length !== 3) {
      throw new Error('Currency must be 3 characters (ISO 4217)');
    }
    return new Price(amount, currency);
  }

  getAmount(): number {
    return this.amount;
  }

  getCurrency(): string {
    return this.currency;
  }

  equals(other: Price): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  toString(): string {
    return `${this.currency} ${this.amount.toFixed(2)}`;
  }
}
