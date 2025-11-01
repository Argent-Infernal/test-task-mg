import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import {
  CreateOrderRequestDto,
  UpdateOrderRequestDto,
  OrderResponseDto,
} from '@/orders';
import AuthenticatedRequest from '@/users/interfaces/AuthenticatedRequest';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый заказ' })
  @ApiResponse({
    status: 201,
    description: 'Заказ успешно создан',
    type: OrderResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Неверные данные заказа' })
  @ApiBody({ type: CreateOrderRequestDto })
  async create(
    @Request() req: AuthenticatedRequest,
    @Body() createOrderDto: CreateOrderRequestDto,
  ): Promise<OrderResponseDto> {
    const userId = req.user?.id || 1;
    return this.ordersService.create(userId, createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех заказов' })
  @ApiResponse({
    status: 200,
    description: 'Список заказов успешно получен',
    type: [OrderResponseDto],
  })
  async findAll(
    @Request() req: AuthenticatedRequest,
  ): Promise<OrderResponseDto[]> {
    const userId = req.user?.id;
    return this.ordersService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить заказ по ID' })
  @ApiParam({ name: 'id', description: 'ID заказа', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Заказ найден',
    type: OrderResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Заказ не найден' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OrderResponseDto> {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные заказа' })
  @ApiParam({ name: 'id', description: 'ID заказа', type: Number })
  @ApiBody({ type: UpdateOrderRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Заказ успешно обновлен',
    type: OrderResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Заказ не найден' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderRequestDto,
  ): Promise<OrderResponseDto> {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить заказ' })
  @ApiParam({ name: 'id', description: 'ID заказа', type: Number })
  @ApiResponse({ status: 200, description: 'Заказ успешно удален' })
  @ApiResponse({ status: 404, description: 'Заказ не найден' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.ordersService.remove(id);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Отменить заказ' })
  @ApiParam({ name: 'id', description: 'ID заказа', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Заказ успешно отменен',
    type: OrderResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Заказ не найден' })
  async cancel(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthenticatedRequest,
  ): Promise<OrderResponseDto> {
    const userId = req.user?.id || 1;
    return this.ordersService.cancelOrder(id, userId);
  }
}
