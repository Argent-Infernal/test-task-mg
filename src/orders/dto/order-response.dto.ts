import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserResponseDto } from '@/users';
import { OrderItemResponseDto, OrderStatus } from '@/orders';

export class OrderResponseDto {
  @ApiProperty({ description: 'ID заказа', example: 1 })
  id: number;

  @ApiProperty({ description: 'ID пользователя', example: 1 })
  userId: number;

  @ApiPropertyOptional({
    description: 'Пользователь',
    type: () => UserResponseDto,
  })
  user?: UserResponseDto;

  @ApiProperty({
    description: 'Статус заказа',
    enum: OrderStatus,
    example: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @ApiProperty({ description: 'Общая сумма заказа', example: 199998 })
  total: number;

  @ApiPropertyOptional({
    description: 'Адрес доставки',
    example: 'Улица пушкина дом колотушкина',
  })
  shippingAddress?: string;

  @ApiPropertyOptional({
    description: 'Элементы заказа',
    type: () => [OrderItemResponseDto],
  })
  items?: OrderItemResponseDto[];

  @ApiProperty({
    description: 'Дата создания',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Дата обновления',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
