import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './models/product.model';
import { PRODUCT_REPOSITORY, ProductRepository } from '@/products';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository,
    },
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
