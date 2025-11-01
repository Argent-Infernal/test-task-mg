import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Product } from '@/products/models';
import {
  CreateProductRequestDto,
  UpdateProductRequestDto,
} from '@/products/dto';
import { IProductRepository, PRODUCT_REPOSITORY } from '@/products';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async create(createProductDto: CreateProductRequestDto): Promise<Product> {
    return this.productRepository.create(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findById(id);

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
    return this.productRepository.findAll({
      where: Sequelize.literal(`name ILIKE '%${name}%'`),
    });
  }
}
