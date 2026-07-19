export class ProductResponseDto {
  id!: string;
  sku!: string;
  title!: string;
  price!: number;
  currency!: string;
  stock!: number;
  createdAt!: Date;
  updatedAt!: Date;
}

export class ProductListResponseDto {
  items!: ProductResponseDto[];
  total!: number;
}
