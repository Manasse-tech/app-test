import { Order } from '../entities/Order';

export const ORDER_REPOSITORY = 'IOrderRepository';

export interface IOrderRepository {
  findById(id: string): Promise<Order | null>;
  findByUserId(userId: string): Promise<Order[]>;
  save(order: Order): Promise<void>;
  delete(id: string): Promise<void>;
  list(page: number, limit: number): Promise<{ items: Order[]; total: number }>;
}
