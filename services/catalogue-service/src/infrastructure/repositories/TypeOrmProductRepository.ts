import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';
import { ProductEntity } from '../persistence/product.entity';

@Injectable()
export class TypeOrmProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly ormRepository: Repository<ProductEntity>
  ) {}

  async findById(id: string): Promise<Product | null> {
    const entity = await this.ormRepository.findOneBy({ id });
    if (!entity) return null;

    return Product.restore(
      entity.id,
      entity.sku,
      entity.title,
      Number(entity.price),
      entity.currency,
      entity.stock
    );
  }

  async findBySKU(sku: string): Promise<Product | null> {
    const entity = await this.ormRepository.findOneBy({ sku });
    if (!entity) return null;

    return Product.restore(
      entity.id,
      entity.sku,
      entity.title,
      Number(entity.price),
      entity.currency,
      entity.stock
    );
  }

  async save(product: Product): Promise<void> {
    const entity = this.ormRepository.create({
      id: product.id,
      sku: product.getSKU().getValue(),
      title: product.getTitle(),
      price: product.getPrice().getAmount(),
      currency: product.getPrice().getCurrency(),
      stock: product.getStock(),
    });
    await this.ormRepository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async list(page: number, limit: number): Promise<{ items: Product[]; total: number }> {
    const [entities, total] = await this.ormRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    const items = entities.map((entity) =>
      Product.restore(
        entity.id,
        entity.sku,
        entity.title,
        Number(entity.price),
        entity.currency,
        entity.stock
      )
    );

    return { items, total };
  }
}
