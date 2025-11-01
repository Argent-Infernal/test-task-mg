import { User } from '@/users/models/user.model';
import { CreateUserRequestDto, UpdateUserRequestDto } from '@/users/dto';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(createUserDto: CreateUserRequestDto): Promise<User>;
  update(id: number, updateUserDto: UpdateUserRequestDto): Promise<User>;
  delete(id: number): Promise<void>;
}

