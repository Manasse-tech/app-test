import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaymentRepository } from '../../domain/repositories/IPaymentRepository';
import { Payment } from '../../domain/entities/Payment';
import { PaymentMethod } from '../../domain/value-objects/PaymentMethod';
import { PaymentEntity } from '../persistence/payment.entity';

@Injectable()
export class TypeOrmPaymentRepository implements IPaymentRepository {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly ormRepository: Repository<PaymentEntity>
  ) {}

  async findById(id: string): Promise<Payment | null> {
    const entity = await this.ormRepository.findOneBy({ id });
    if (!entity) return null;

    const method = new PaymentMethod(entity.methodType, entity.methodDetails);
    return Payment.restore(
      entity.id,
      entity.orderId,
      Number(entity.amount),
      entity.currency,
      entity.status,
      method,
      entity.transactionId
    );
  }

  async findByOrderId(orderId: string): Promise<Payment | null> {
    const entity = await this.ormRepository.findOneBy({ orderId });
    if (!entity) return null;

    const method = new PaymentMethod(entity.methodType, entity.methodDetails);
    return Payment.restore(
      entity.id,
      entity.orderId,
      Number(entity.amount),
      entity.currency,
      entity.status,
      method,
      entity.transactionId
    );
  }

  async save(payment: Payment): Promise<void> {
    const method = payment.getMethod();
    const entity = this.ormRepository.create({
      id: payment.id,
      orderId: payment.getOrderId(),
      amount: payment.getAmount(),
      currency: payment.getCurrency(),
      status: payment.getStatus(),
      methodType: method.getType(),
      methodDetails: method.getDetails(),
      transactionId: payment.getTransactionId(),
    });
    await this.ormRepository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async list(page: number, limit: number): Promise<{ items: Payment[]; total: number }> {
    const [entities, total] = await this.ormRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    const items = entities.map((entity) => {
      const method = new PaymentMethod(entity.methodType, entity.methodDetails);
      return Payment.restore(
        entity.id,
        entity.orderId,
        Number(entity.amount),
        entity.currency,
        entity.status,
        method,
        entity.transactionId
      );
    });

    return { items, total };
  }
}
