import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductResponseDto } from '@/products';

export class OrderItemResponseDto {
  @ApiProperty({ description: 'ID элемента заказа', example: 1 })
  id: number;

  @ApiProperty({ description: 'ID заказа', example: 1 })
  orderId: number;

  @ApiProperty({ description: 'ID товара', example: 1 })
  productId: number;

  @ApiPropertyOptional({
    description: 'Товар',
    type: () => ProductResponseDto,
  })
  product?: ProductResponseDto;

  @ApiProperty({ description: 'Количество товара', example: 2 })
  quantity: number;

  @ApiProperty({ description: 'Цена товара на момент заказа', example: 99999 })
  price: number;

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
