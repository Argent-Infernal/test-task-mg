import { IsOptional, IsEnum, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '../models/order.model';

export class UpdateOrderDto {
  @ApiPropertyOptional({
    description: 'Статус заказа',
    enum: OrderStatus,
    example: OrderStatus.PROCESSING,
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiPropertyOptional({
    description: 'Адрес доставки',
    example: 'Красная площадь',
  })
  @IsOptional()
  @IsString()
  shippingAddress?: string;
}
