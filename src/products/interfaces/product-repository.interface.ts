import {
  CreateProductRequestDto,
  Product,
  UpdateProductRequestDto,
} from '@/products';
import { FindOptions } from 'sequelize';

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');

export interface IProductRepository {
  findById(id: number): Promise<Product | null>;
  findAll(options?: FindOptions<Product>): Promise<Product[]>;
  create(createProductDto: CreateProductRequestDto): Promise<Product>;
  update(id: number, updateUserDto: UpdateProductRequestDto): Promise<Product>;
  delete(id: number): Promise<void>;
}
