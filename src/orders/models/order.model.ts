import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '@/users';
import { OrderItem } from '@/orders';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.ENUM(...Object.values(OrderStatus)),
    defaultValue: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  })
  total: number;

  @Column({
    type: DataType.STRING,
  })
  shippingAddress: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  @HasMany(() => OrderItem)
  items: OrderItem[];
}
