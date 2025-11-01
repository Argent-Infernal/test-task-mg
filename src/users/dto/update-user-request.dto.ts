import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRequestDto } from './create-user-request.dto';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto) {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
