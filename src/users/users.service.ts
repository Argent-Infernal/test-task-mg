import {
  Injectable,
  ConflictException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  User,
  CreateUserRequestDto,
  UpdateUserRequestDto,
  IUserRepository,
  USER_REPOSITORY,
} from '@/users';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async create(createUserDto: CreateUserRequestDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    return this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async update(id: number, updateUserDto: UpdateUserRequestDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(
        updateUserDto.email,
      );

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
    }

    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.userRepository.delete(id);
  }

  //Скорее всего метод для аутентификации
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}
