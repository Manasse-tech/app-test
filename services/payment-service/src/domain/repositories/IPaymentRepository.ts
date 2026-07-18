import { Payment } from '../entities/Payment';

export const PAYMENT_REPOSITORY = 'IPaymentRepository';

export interface IPaymentRepository {
  findById(id: string): Promise<Payment | null>;
  findByOrderId(orderId: string): Promise<Payment | null>;
  save(payment: Payment): Promise<void>;
  delete(id: string): Promise<void>;
  list(page: number, limit: number): Promise<{ items: Payment[]; total: number }>;
}
