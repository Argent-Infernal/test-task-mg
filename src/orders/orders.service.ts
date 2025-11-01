import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order, OrderItem, OrderStatus } from '@/orders/models';
import { ProductsService } from '@/products/products.service';
import { CreateOrderRequestDto, UpdateOrderRequestDto } from '@/orders/dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
    @InjectModel(OrderItem)
    private orderItemModel: typeof OrderItem,
    private productsService: ProductsService,
  ) {}

  async create(
    userId: number,
    createOrderDto: CreateOrderRequestDto,
  ): Promise<Order> {
    if (!createOrderDto.items || createOrderDto.items.length === 0) {
      throw new BadRequestException('Order must have at least one item');
    }

    let total = 0;
    const orderItems = [];

    for (const item of createOrderDto.items) {
      const product = await this.productsService.findOne(item.productId);

      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product ${product.name}`,
        );
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      const orderItem = await this.orderItemModel.create({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });

      orderItems.push(orderItem);

      await this.productsService.decreaseStock(item.productId, item.quantity);
    }

    const order = await this.orderModel.create({
      userId,
      total,
      shippingAddress: createOrderDto.shippingAddress || '',
      status: OrderStatus.PENDING,
    });

    await Promise.all(
      orderItems.map((item) => item.update({ orderId: order.id })),
    );

    return this.findOne(order.id);
  }

  async findAll(userId?: number): Promise<Order[]> {
    const where = userId ? { userId } : {};

    return this.orderModel.findAll({
      where,
      include: [
        {
          association: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          association: 'items',
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderModel.findByPk(id, {
      include: [
        {
          association: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          association: 'items',
        },
      ],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderRequestDto,
  ): Promise<Order> {
    const order = await this.findOne(id);

    await order.update(updateOrderDto);

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);

    await order.destroy();
  }

  async cancelOrder(id: number, userId: number): Promise<Order> {
    const order = await this.findOne(id);

    if (order.status === OrderStatus.DELIVERED) {
      throw new BadRequestException('Cannot cancel delivered order');
    }

    order.status = OrderStatus.CANCELLED;
    await order.save();

    return this.findOne(id);
  }
}
