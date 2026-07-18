import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { Order } from '../../domain/entities/Order';
import { OrderItem } from '../../domain/value-objects/OrderItem';
import { OrderEntity } from '../persistence/order.entity';

@Injectable()
export class TypeOrmOrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ormRepository: Repository<OrderEntity>
  ) {}

  async findById(id: string): Promise<Order | null> {
    const entity = await this.ormRepository.findOneBy({ id });
    if (!entity) return null;

    const items = entity.items.map(
      (item) => new OrderItem(item.productId, item.quantity, item.unitPrice, item.currency)
    );

    return Order.restore(
      entity.id,
      entity.userId,
      items,
      entity.status,
      Number(entity.totalAmount),
      entity.currency
    );
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const entities = await this.ormRepository.find({ where: { userId } });

    return entities.map((entity) => {
      const items = entity.items.map(
        (item) => new OrderItem(item.productId, item.quantity, item.unitPrice, item.currency)
      );
      return Order.restore(
        entity.id,
        entity.userId,
        items,
        entity.status,
        Number(entity.totalAmount),
        entity.currency
      );
    });
  }

  async save(order: Order): Promise<void> {
    const entity = this.ormRepository.create({
      id: order.id,
      userId: order.getUserId(),
      status: order.getStatus(),
      totalAmount: order.getTotalAmount(),
      currency: order.getCurrency(),
      items: order.getItems().map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        currency: item.currency,
      })),
    });
    await this.ormRepository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async list(page: number, limit: number): Promise<{ items: Order[]; total: number }> {
    const [entities, total] = await this.ormRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    const items = entities.map((entity) => {
      const orderItems = entity.items.map(
        (item) => new OrderItem(item.productId, item.quantity, item.unitPrice, item.currency)
      );
      return Order.restore(
        entity.id,
        entity.userId,
        orderItems,
        entity.status,
        Number(entity.totalAmount),
        entity.currency
      );
    });

    return { items, total };
  }
}
