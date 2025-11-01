import {
  IsString,
  IsNumber,
  Min,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductRequestDto {
  @ApiProperty({ description: 'Название товара', example: 'Ноутбук ксяоми' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'Описание товара',
    example: 'Мощный игровой ноутбук',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Цена товара', example: 99999, minimum: 0 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Количество товара на складе',
    example: 10,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiPropertyOptional({
    description: 'Категория товара',
    example: 'Электроника',
  })
  @IsOptional()
  @IsString()
  category?: string;
}
