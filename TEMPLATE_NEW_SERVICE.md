# NSUG Implementation Template

This template accelerates creation of additional services using the Auth Service pattern.

## Quick Start: Create a New Service (e.g., Product Service)

### 1. Setup Project Structure

```bash
mkdir -p services/product-service/src/domain/{entities,value-objects,events,repositories}
mkdir -p services/product-service/src/application/{commands,queries}
mkdir -p services/product-service/src/infrastructure/{repositories,config}
mkdir -p services/product-service/test/{unit,integration}
```

### 2. Copy Domain Layer Template

**services/product-service/src/domain/entities/Product.ts**

```typescript
import { BaseAggregateRoot } from '@nsug/events';
import { ProductPrice } from './value-objects/ProductPrice';

export class Product extends BaseAggregateRoot {
  private sku: string;
  private title: string;
  private price: ProductPrice;
  private stock: number;
  private createdAt: Date;

  private constructor(id: string, sku: string, title: string, price: ProductPrice, stock: number) {
    super(id);
    this.sku = sku;
    this.title = title;
    this.price = price;
    this.stock = stock;
    this.createdAt = new Date();
  }

  static create(
    id: string,
    sku: string,
    title: string,
    price: ProductPrice,
    stock: number
  ): Product {
    return new Product(id, sku, title, price, stock);
  }

  // Domain methods
  getSku(): string {
    return this.sku;
  }

  getPrice(): ProductPrice {
    return this.price;
  }

  reserve(quantity: number): void {
    if (this.stock < quantity) {
      throw new Error(`Insufficient stock. Available: ${this.stock}, Requested: ${quantity}`);
    }
    this.stock -= quantity;
  }
}
```

**services/product-service/src/domain/value-objects/ProductPrice.ts**

```typescript
export class ProductPrice {
  private amount: number;
  private currency: 'XOF' | 'EUR' | 'USD';

  private constructor(amount: number, currency: 'XOF' | 'EUR' | 'USD') {
    if (amount < 0) throw new Error('Price cannot be negative');
    this.amount = amount;
    this.currency = currency;
  }

  static create(amount: number, currency: 'XOF' | 'EUR' | 'USD' = 'XOF'): ProductPrice {
    return new ProductPrice(amount, currency);
  }

  getAmount(): number {
    return this.amount;
  }

  getCurrency(): string {
    return this.currency;
  }

  equals(other: ProductPrice): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }
}
```

### 3. Copy Application Layer Template

**services/product-service/src/application/commands/CreateProductCommand.ts**

```typescript
import { Command } from './Command';

export class CreateProductCommand extends Command {
  readonly sku: string;
  readonly title: string;
  readonly price: number;
  readonly stock: number;

  constructor(sku: string, title: string, price: number, stock: number) {
    super();
    this.sku = sku;
    this.title = title;
    this.price = price;
    this.stock = stock;
  }

  get commandType(): string {
    return 'CREATE_PRODUCT';
  }
}
```

**services/product-service/src/application/commands/create-product.handler.ts**

```typescript
import { Injectable } from '@nestjs/common';
import { ICommandHandler } from './Command';
import { CreateProductCommand } from './CreateProductCommand';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';
import { ProductPrice } from '../../domain/value-objects/ProductPrice';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateProductCommandHandler implements ICommandHandler<CreateProductCommand> {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(command: CreateProductCommand): Promise<void> {
    const existingSku = await this.productRepository.findBySku(command.sku);
    if (existingSku) {
      throw new Error(`Product with SKU ${command.sku} already exists`);
    }

    const productId = randomUUID();
    const price = ProductPrice.create(command.price, 'XOF');
    const product = Product.create(productId, command.sku, command.title, price, command.stock);

    await this.productRepository.save(product);
  }
}
```

### 4. Copy Infrastructure Layer Template

**services/product-service/src/domain/repositories/IProductRepository.ts**

```typescript
import { Product } from '../entities/Product';

export interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  findBySku(sku: string): Promise<Product | null>;
  save(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
}
```

**services/product-service/src/infrastructure/repositories/InMemoryProductRepository.ts**

```typescript
import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';

@Injectable()
export class InMemoryProductRepository implements IProductRepository {
  private products: Map<string, Product> = new Map();

  async findById(id: string): Promise<Product | null> {
    return this.products.get(id) ?? null;
  }

  async findBySku(sku: string): Promise<Product | null> {
    for (const product of this.products.values()) {
      if (product.getSku() === sku) {
        return product;
      }
    }
    return null;
  }

  async save(product: Product): Promise<void> {
    this.products.set(product.id, product);
  }

  async delete(id: string): Promise<void> {
    this.products.delete(id);
  }
}
```

**services/product-service/src/infrastructure/config/product.module.ts**

```typescript
import { Module } from '@nestjs/common';
import { CreateProductCommandHandler } from '../../application/commands/create-product.handler';
import { InMemoryProductRepository } from '../repositories/InMemoryProductRepository';
import { IProductRepository } from '../../domain/repositories/IProductRepository';

@Module({
  providers: [
    CreateProductCommandHandler,
    {
      provide: IProductRepository,
      useClass: InMemoryProductRepository,
    },
  ],
})
export class ProductModule {}
```

### 5. Create Main Entry Point

**services/product-service/src/main.ts**

```typescript
import { NestFactory } from '@nestjs/core';
import { ProductModule } from './infrastructure/config/product.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ProductModule);
  const PORT = process.env.PORT ?? 3002;
  await app.listen(PORT);
  console.log(`Product Service listening on port ${PORT}`);
}

bootstrap().catch((err: unknown) => {
  console.error('Failed to start Product Service:', err);
  process.exit(1);
});
```

### 6. Add Unit Test

**services/product-service/test/unit/domain/product.spec.ts**

```typescript
import { Product } from '../../../src/domain/entities/Product';
import { ProductPrice } from '../../../src/domain/value-objects/ProductPrice';

describe('Product Entity', () => {
  it('should create a product', () => {
    const price = ProductPrice.create(5000, 'XOF');
    const product = Product.create('id-1', 'SKU-001', 'Laptop', price, 10);

    expect(product.getSku()).toBe('SKU-001');
    expect(product.getPrice().getAmount()).toBe(5000);
  });

  it('should reserve stock', () => {
    const price = ProductPrice.create(5000, 'XOF');
    const product = Product.create('id-1', 'SKU-001', 'Laptop', price, 10);

    product.reserve(5);
    expect(() => product.reserve(10)).toThrow('Insufficient stock');
  });
});
```

---

## Service Implementation Order

1. **Auth Service** ✅ (Already done)
2. **Catalogue Service** (Product management)
3. **Order Service** (Order creation & tracking)
4. **Payment Service** (Payment processing)
5. **Inventory Service** (Stock management)
6. **Notification Service** (Emails, SMS)
7. **AI Orchestrator** (Recommendations)
8. **BFF Services** (Frontend aggregation)

Each follows the same hexagonal pattern.

---

## Commands to Verify Setup

```bash
# Type check (strict mode)
npm run type-check

# Format code
npm run format

# Lint
npm run lint

# Run single service tests
npm run test -- services/product-service

# Build
npm run build
```

All services are now structured, testable, and ready for database layer implementation.
