import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@/users/models/user.model';
import { CreateUserRequestDto, UpdateUserRequestDto } from '@/users/dto';
import { IUserRepository } from '@/users/interfaces/user-repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findById(id: number): Promise<User | null> {
    return this.userModel.findByPk(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async create(createUserDto: CreateUserRequestDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserRequestDto): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    await user.update(updateUserDto);
    const updatedUser = await this.findById(id);
    if (!updatedUser) {
      throw new Error(`User with ID ${id} not found after update`);
    }
    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    await user.destroy();
  }
}
