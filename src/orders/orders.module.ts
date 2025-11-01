import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './models/order.model';
import { OrderItem } from './models/order-item.model';
import { ProductsModule } from '../products/products.module';
import { ORDER_REPOSITORY, OrderRepository } from '@/orders';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Order, OrderItem]),
    ProductsModule,
    UsersModule,
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderRepository,
    },
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
