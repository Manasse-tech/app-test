import { BaseAggregateRoot } from '@nsug/events';
import { ProductCreatedEvent } from '../events/product.events';
import { SKU } from '../value-objects/SKU';
import { Price } from '../value-objects/Price';

export class Product extends BaseAggregateRoot {
  private sku: SKU;
  private title: string;
  private price: Price;
  private stock: number;
  private createdAt: Date;
  private updatedAt: Date;

  private constructor(id: string, sku: SKU, title: string, price: Price) {
    super(id);
    this.sku = sku;
    this.title = title;
    this.price = price;
    this.stock = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static async create(
    id: string,
    sku: string,
    title: string,
    price: number,
    currency: string
  ): Promise<Product> {
    const skuVo = SKU.create(sku);
    const priceVo = Price.create(price, currency);
    const product = new Product(id, skuVo, title, priceVo);
    product.addEvent(new ProductCreatedEvent(id, sku, title, price, currency));
    return product;
  }

  static restore(
    id: string,
    sku: string,
    title: string,
    price: number,
    currency: string,
    stock: number
  ): Product {
    const skuVo = SKU.create(sku);
    const priceVo = Price.create(price, currency);
    const product = new Product(id, skuVo, title, priceVo);
    product.stock = stock;
    return product;
  }

  getSKU(): SKU {
    return this.sku;
  }

  getTitle(): string {
    return this.title;
  }

  getPrice(): Price {
    return this.price;
  }

  getStock(): number {
    return this.stock;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  addStock(quantity: number): void {
    if (quantity < 0) {
      throw new Error('Cannot add negative stock');
    }
    this.stock += quantity;
    this.updatedAt = new Date();
  }

  removeStock(quantity: number): void {
    if (quantity < 0) {
      throw new Error('Cannot remove negative stock');
    }
    if (this.stock < quantity) {
      throw new Error('Insufficient stock');
    }
    this.stock -= quantity;
    this.updatedAt = new Date();
  }
}
