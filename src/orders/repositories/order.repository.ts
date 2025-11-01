import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order, OrderItem, OrderStatus } from '@/orders/models';
import { IOrderRepository } from '@/orders/interfaces';
import { UpdateOrderRequestDto } from '@/orders/dto';
import { User } from '@/users/models';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
    @InjectModel(OrderItem)
    private readonly orderItemModel: typeof OrderItem,
  ) {}

  async create(
    userId: number,
    total: number,
    shippingAddress: string,
    items: { productId: number; quantity: number; price: number }[],
  ): Promise<Order> {
    const order = await this.orderModel.create({
      userId,
      total,
      shippingAddress,
      status: OrderStatus.PENDING,
    });

    const orderItems = items.map((item) => ({
      ...item,
      orderId: order.id,
    }));

    await this.orderItemModel.bulkCreate(orderItems);

    return this.findById(order.id);
  }

  async findAll(userId?: number): Promise<Order[]> {
    const where = userId ? { userId } : {};
    return this.orderModel.findAll({
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: OrderItem,
          as: 'items',
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async findById(id: number): Promise<Order | null> {
    return this.orderModel.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: OrderItem,
          as: 'items',
        },
      ],
    });
  }

  async update(
    id: number,
    data: Partial<UpdateOrderRequestDto>,
  ): Promise<Order> {
    await this.orderModel.update(data, { where: { id } });
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.orderModel.destroy({ where: { id } });
  }
}
