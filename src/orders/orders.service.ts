import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { Order, OrderStatus } from '@/orders/models';
import { ProductsService } from '@/products/products.service';
import { CreateOrderRequestDto, UpdateOrderRequestDto } from '@/orders/dto';
import { IOrderRepository, ORDER_REPOSITORY } from '@/orders';
import { UsersService } from '@/users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
  ) {}

  async create(
    userId: number,
    createOrderDto: CreateOrderRequestDto,
  ): Promise<Order> {
    await this.usersService.findOne(userId);

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

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });

      await this.productsService.decreaseStock(item.productId, item.quantity);
    }

    return this.orderRepository.create(
      userId,
      total,
      createOrderDto.shippingAddress || '',
      orderItems,
    );
  }

  async findAll(userId?: number): Promise<Order[]> {
    return this.orderRepository.findAll(userId);
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderRequestDto,
  ): Promise<Order> {
    await this.findOne(id);

    return this.orderRepository.update(id, updateOrderDto);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.orderRepository.delete(id);
  }

  async cancelOrder(id: number, userId: number): Promise<Order> {
    const order = await this.findOne(id);

    if (order.status === OrderStatus.DELIVERED) {
      throw new BadRequestException('Cannot cancel delivered order');
    }

    return this.orderRepository.update(id, { status: OrderStatus.CANCELLED });
  }
}
