import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создать новый товар' })
  @ApiResponse({ status: 201, description: 'Товар успешно создан' })
  @ApiBody({ type: CreateProductDto })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех товаров или найти по названию' })
  @ApiQuery({ name: 'search', required: false, description: 'Поиск товаров по названию' })
  @ApiResponse({ status: 200, description: 'Список товаров успешно получен' })
  findAll(@Query('search') search?: string) {
    if (search) {
      return this.productsService.searchByName(search);
    }
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить товар по ID' })
  @ApiParam({ name: 'id', description: 'ID товара' })
  @ApiResponse({ status: 200, description: 'Товар найден' })
  @ApiResponse({ status: 404, description: 'Товар не найден' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные товара' })
  @ApiParam({ name: 'id', description: 'ID товара' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Товар успешно обновлен' })
  @ApiResponse({ status: 404, description: 'Товар не найден' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить товар' })
  @ApiParam({ name: 'id', description: 'ID товара' })
  @ApiResponse({ status: 200, description: 'Товар успешно удален' })
  @ApiResponse({ status: 404, description: 'Товар не найден' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}

