import {
  IsArray,
  ValidateNested,
  IsInt,
  Min,
  IsString,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderItemDto {
  @ApiProperty({ description: 'ID товара', example: 1 })
  @IsInt()
  productId: number;

  @ApiProperty({ description: 'Количество товара', example: 2, minimum: 1 })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Список товаров в заказе',
    type: [OrderItemDto],
    example: [{ productId: 1, quantity: 2 }],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiPropertyOptional({
    description: 'Адрес доставки',
    example: 'Улица пушкина дом колотушкина',
  })
  @IsOptional()
  @IsString()
  shippingAddress?: string;
}
