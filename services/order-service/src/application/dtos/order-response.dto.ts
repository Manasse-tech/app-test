export class OrderItemResponseDto {
  productId!: string;
  quantity!: number;
  unitPrice!: number;
  currency!: string;
  subtotal!: number;
}

export class OrderResponseDto {
  id!: string;
  userId!: string;
  items!: OrderItemResponseDto[];
  status!: string;
  totalAmount!: number;
  currency!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class OrderListResponseDto {
  items!: OrderResponseDto[];
  total!: number;
}
