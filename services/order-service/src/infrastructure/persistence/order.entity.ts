import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { OrderStatus } from '../../domain/value-objects/OrderStatus';

export interface OrderItemData {
  productId: string;
  quantity: number;
  unitPrice: number;
  currency: string;
}

@Entity('orders')
export class OrderEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column('uuid')
  userId!: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status!: OrderStatus;

  @Column('decimal', { precision: 12, scale: 2 })
  totalAmount!: number;

  @Column()
  currency!: string;

  @Column({ type: 'jsonb' })
  items!: OrderItemData[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
