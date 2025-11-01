import { Sequelize } from 'sequelize-typescript';
import { User } from '@/users';
import { Product } from '@/products/models/product.model';
import { Order, OrderItem } from '@/orders';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
      });

      sequelize.addModels([User, Product, Order, OrderItem]);
      await sequelize.authenticate();

      return sequelize;
    },
    inject: [ConfigService],
  },
];
