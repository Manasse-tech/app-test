export class SKU {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value.toUpperCase().trim();
  }

  static create(value: string): SKU {
    if (!value || value.trim().length === 0) {
      throw new Error('SKU cannot be empty');
    }
    if (value.length > 50) {
      throw new Error('SKU must be 50 characters or less');
    }
    return new SKU(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: SKU): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
