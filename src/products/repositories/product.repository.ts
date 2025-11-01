import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  CreateProductRequestDto,
  IProductRepository,
  Product,
  UpdateProductRequestDto,
} from '@/products';
import { FindOptions } from 'sequelize';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async findById(id: number): Promise<Product | null> {
    return this.productModel.findByPk(id);
  }

  async findAll(options?: FindOptions<Product>): Promise<Product[]> {
    return this.productModel.findAll(options);
  }

  async create(createProductDto: CreateProductRequestDto): Promise<Product> {
    return this.productModel.create(createProductDto);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductRequestDto,
  ): Promise<Product> {
    const product = await this.findById(id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    await product.update(updateProductDto);
    const updatedProduct = await this.findById(id);
    if (!updatedProduct) {
      throw new Error(`Product with ID ${id} not found after update`);
    }
    return updatedProduct;
  }

  async delete(id: number): Promise<void> {
    const product = await this.findById(id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    await product.destroy();
  }
}
