import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(productDto: ProductDto): Promise<ProductEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id: productDto.categoryId },
    });
    if (!category)
      throw new NotFoundException(
        `Category with "${productDto.categoryId}" id Not Found`,
      );
    const product = new ProductEntity();
    product.name = productDto.name;
    product.detail = productDto.detail;
    product.description = productDto.description;
    product.price = productDto.price;
    product.status = productDto.status;
    product.category = category;
    const result = await this.productRepository.save(product);
    return result;
  }

  async findAllProduct(): Promise<ProductEntity[]> {
    return await this.productRepository.createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .getMany();
  }

  async findProductById(id: number): Promise<ProductEntity> {
    const product = await this.productRepository
                   .createQueryBuilder('product')
                   .where('product.categoryId = :id', {id})
                   .leftJoinAndSelect('product.category', 'category')
                   .getOne();
    if (!product)
      throw new NotFoundException(`Product with "${id}" id Not Found`);
    return product;
  }

  async update(id: number, productDto: ProductDto): Promise<string> {
    const category = await this.categoryRepository.findOne({
      where: { id: productDto.categoryId },
    });
    if (!category)
      throw new NotFoundException(
        `Product with "${productDto.categoryId}" id Not Found`,
      );
    const { affected } = await this.productRepository.update(id, productDto);
    if (!affected)
      throw new NotFoundException(`Product with "${id}" id Not Found`);
    return `Product with "${id}" id updated`;
  }

  async delete(id: number): Promise<string> {
    const { affected } = await this.productRepository.delete(id);
    if (!affected)
      throw new NotFoundException(`Product with "${id}" id Not Found`);
    return `Product with "${id}" id deleted`;
  }
}
