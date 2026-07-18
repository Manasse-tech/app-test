import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ErrorHandlingModule } from '@nsug/shared/error-handling/error-handling.module';
import { ProductEntity } from '../persistence/product.entity';
import { ProductController } from '../../application/commands/product.controller';
import { CreateProductCommandHandler } from '../../application/commands/CreateProductCommandHandler';
import { GetProductByIdQueryHandler } from '../../application/queries/GetProductByIdQueryHandler';
import { TypeOrmProductRepository } from '../repositories/TypeOrmProductRepository';
import { PRODUCT_REPOSITORY } from '../../domain/repositories/IProductRepository';

@Module({
  imports: [ErrorHandlingModule, TypeOrmModule.forFeature([ProductEntity]), CqrsModule],
  controllers: [ProductController],
  providers: [
    CreateProductCommandHandler,
    GetProductByIdQueryHandler,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: TypeOrmProductRepository,
    },
  ],
})
export class CatalogueModule {}
