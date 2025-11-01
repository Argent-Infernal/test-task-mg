import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создать новый заказ' })
  @ApiResponse({ status: 201, description: 'Заказ успешно создан' })
  @ApiResponse({ status: 400, description: 'Неверные данные заказа' })
  @ApiBody({ type: CreateOrderDto })
  create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    const userId = req.user?.id || 1;
    return this.ordersService.create(userId, createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех заказов' })
  @ApiResponse({ status: 200, description: 'Список заказов успешно получен' })
  findAll(@Request() req) {
    const userId = req.user?.id;
    return this.ordersService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить заказ по ID' })
  @ApiParam({ name: 'id', description: 'ID заказа' })
  @ApiResponse({ status: 200, description: 'Заказ найден' })
  @ApiResponse({ status: 404, description: 'Заказ не найден' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные заказа' })
  @ApiParam({ name: 'id', description: 'ID заказа' })
  @ApiBody({ type: UpdateOrderDto })
  @ApiResponse({ status: 200, description: 'Заказ успешно обновлен' })
  @ApiResponse({ status: 404, description: 'Заказ не найден' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить заказ' })
  @ApiParam({ name: 'id', description: 'ID заказа' })
  @ApiResponse({ status: 200, description: 'Заказ успешно удален' })
  @ApiResponse({ status: 404, description: 'Заказ не найден' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Отменить заказ' })
  @ApiParam({ name: 'id', description: 'ID заказа' })
  @ApiResponse({ status: 200, description: 'Заказ успешно отменен' })
  @ApiResponse({ status: 404, description: 'Заказ не найден' })
  cancel(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const userId = req.user?.id || 1;
    return this.ordersService.cancelOrder(id, userId);
  }
}

