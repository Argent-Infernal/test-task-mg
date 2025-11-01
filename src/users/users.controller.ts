import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import {
  CreateUserRequestDto,
  UpdateUserRequestDto,
  UserResponseDto,
} from '@/users/dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Создать нового пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно создан',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Пользователь с таким email уже существует',
  })
  @ApiBody({ type: CreateUserRequestDto })
  async create(
    @Body() createUserDto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Список пользователей успешно получен',
    type: [UserResponseDto],
  })
  async findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiParam({ name: 'id', description: 'ID пользователя', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Пользователь найден',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные пользователя' })
  @ApiParam({ name: 'id', description: 'ID пользователя', type: Number })
  @ApiBody({ type: UpdateUserRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно обновлен',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiParam({ name: 'id', description: 'ID пользователя', type: Number })
  @ApiResponse({ status: 200, description: 'Пользователь успешно удален' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
