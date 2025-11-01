import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Product } from '@/products/models';
import {
  CreateProductRequestDto,
  UpdateProductRequestDto,
} from '@/products/dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async create(createProductDto: CreateProductRequestDto): Promise<Product> {
    return this.productModel.create(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productModel.findByPk(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductRequestDto,
  ): Promise<Product> {
    const product = await this.findOne(id);

    await product.update(updateProductDto);

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await product.destroy();
  }

  async decreaseStock(productId: number, quantity: number): Promise<void> {
    const product = await this.findOne(productId);

    if (product.stock < quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    product.stock -= quantity;
    await product.save();
  }

  async increaseStock(productId: number, quantity: number): Promise<void> {
    const product = await this.findOne(productId);
    product.stock += quantity;
    await product.save();
  }

  async searchByName(name: string): Promise<Product[]> {
    return this.productModel.findAll({
      where: Sequelize.literal(`name ILIKE '%${name}%'`),
    } as any);
  }
}
