import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({ description: 'ID товара', example: 1 })
  id: number;

  @ApiProperty({ description: 'Название товара', example: 'Ноутбук ксяоми' })
  name: string;

  @ApiPropertyOptional({
    description: 'Описание товара',
    example: 'Мощный игровой ноутбук',
  })
  description?: string;

  @ApiProperty({ description: 'Цена товара', example: 99999 })
  price: number;

  @ApiProperty({ description: 'Количество товара на складе', example: 10 })
  stock: number;

  @ApiPropertyOptional({
    description: 'Категория товара',
    example: 'Электроника',
  })
  category?: string;

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
