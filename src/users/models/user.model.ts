import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import { Order } from '@/orders';
import * as bcrypt from 'bcrypt';
import { UserRole } from './user-role.enum';

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
    type: DataType.ENUM(...Object.values(UserRole)),
    defaultValue: UserRole.USER,
  })
  role: UserRole;

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

  @BeforeUpdate
  static async hashPasswordOnUpdate(instance: User) {
    if (instance.password && !instance.password.startsWith('$2')) {
      instance.password = await bcrypt.hash(instance.password, 10);
    }
  }
}
