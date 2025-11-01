import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ description: 'ID пользователя', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({ description: 'Имя пользователя', example: 'Владислав' })
  firstName: string;

  @ApiProperty({ description: 'Фамилия пользователя', example: 'Кубышин' })
  lastName: string;

  @ApiProperty({
    description: 'Роль пользователя',
    example: 'user',
    enum: ['user', 'admin'],
  })
  role: string;

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
