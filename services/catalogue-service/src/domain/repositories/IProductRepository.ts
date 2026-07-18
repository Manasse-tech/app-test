import { Product } from '../entities/Product';

export const PRODUCT_REPOSITORY = 'IProductRepository';

export interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  findBySKU(sku: string): Promise<Product | null>;
  save(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
  list(page: number, limit: number): Promise<{ items: Product[]; total: number }>;
}
