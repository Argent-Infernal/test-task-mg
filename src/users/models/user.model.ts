import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BeforeCreate,
} from 'sequelize-typescript';
import { Order } from '@/orders';
import * as bcrypt from 'bcrypt';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.ENUM('user', 'admin'),
    defaultValue: 'user',
  })
  role: string;

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

  @HasMany(() => Order)
  orders: Order[];

  @BeforeCreate
  static async hashPassword(instance: User) {
    if (instance.password && !instance.password.startsWith('$2')) {
      instance.password = await bcrypt.hash(instance.password, 10);
    }
  }
}
