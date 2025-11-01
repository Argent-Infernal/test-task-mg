import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email пользователя',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя (минимум 6 символов)',
    example: 'password123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Имя пользователя', example: 'Владислав' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Фамилия пользователя', example: 'Кубышин' })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({
    description: 'Роль пользователя',
    example: 'user',
    enum: ['user', 'admin'],
  })
  @IsOptional()
  @IsString()
  role?: string;
}
