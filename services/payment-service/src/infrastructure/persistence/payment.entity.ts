import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PaymentStatus } from '../../domain/value-objects/PaymentStatus';
import { PaymentMethodType } from '../../domain/value-objects/PaymentMethod';

@Entity('payments')
export class PaymentEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column('uuid')
  orderId!: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amount!: number;

  @Column()
  currency!: string;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status!: PaymentStatus;

  @Column({ type: 'enum', enum: PaymentMethodType })
  methodType!: PaymentMethodType;

  @Column({ type: 'jsonb' })
  methodDetails!: Record<string, any>;

  @Column({ nullable: true })
  transactionId!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
