import { Order } from '@/orders/models';
import { UpdateOrderRequestDto } from '@/orders/dto';

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

export interface IOrderRepository {
  create(
    userId: number,
    total: number,
    shippingAddress: string,
    items: {
      productId: number;
      quantity: number;
      price: number;
    }[],
  ): Promise<Order>;
  findAll(userId?: number): Promise<Order[]>;
  findById(id: number): Promise<Order | null>;
  update(id: number, data: Partial<UpdateOrderRequestDto>): Promise<Order>;
  delete(id: number): Promise<void>;
}
