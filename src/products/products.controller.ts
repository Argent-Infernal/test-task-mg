import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import {
  CreateProductRequestDto,
  ProductResponseDto,
  UpdateProductRequestDto,
} from '@/products/dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый товар' })
  @ApiResponse({
    status: 201,
    description: 'Товар успешно создан',
    type: ProductResponseDto,
  })
  @ApiBody({ type: CreateProductRequestDto })
  async create(
    @Body() createProductDto: CreateProductRequestDto,
  ): Promise<ProductResponseDto> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Получить список всех товаров или найти по названию',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Поиск товаров по названию',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Список товаров успешно получен',
    type: [ProductResponseDto],
  })
  async findAll(
    @Query('search') search?: string,
  ): Promise<ProductResponseDto[]> {
    if (search) {
      return this.productsService.searchByName(search);
    }
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить товар по ID' })
  @ApiParam({ name: 'id', description: 'ID товара', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Товар найден',
    type: ProductResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Товар не найден' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductResponseDto> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные товара' })
  @ApiParam({ name: 'id', description: 'ID товара', type: Number })
  @ApiBody({ type: UpdateProductRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Товар успешно обновлен',
    type: ProductResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Товар не найден' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductRequestDto,
  ): Promise<ProductResponseDto> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить товар' })
  @ApiParam({ name: 'id', description: 'ID товара', type: Number })
  @ApiResponse({ status: 200, description: 'Товар успешно удален' })
  @ApiResponse({ status: 404, description: 'Товар не найден' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}
