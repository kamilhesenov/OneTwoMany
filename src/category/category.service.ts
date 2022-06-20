import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(categoryDto: CategoryDto): Promise<CategoryEntity> {
    const category = new CategoryEntity();
    category.name = categoryDto.name;
    category.productCount = categoryDto.productCount;
    const result = await this.categoryRepository.save(category);
    return result;
  }

  async findAllCategories(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async findCategoryById(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category)
      throw new NotFoundException(`Category with "${id}" id Not Found`);
    return category;
  }

  async update(id: number, categoryDto: CategoryDto): Promise<string> {
    const { affected } = await this.categoryRepository.update(id, categoryDto);
    if (!affected)
      throw new NotFoundException(`Category with "${id}" id Not Found`);
    return `Category with "${id}" id updated`;
  }

  async delete(id: number): Promise<string> {
    const { affected } = await this.categoryRepository.delete(id);
    if (!affected)
      throw new NotFoundException(`Category with "${id}" id Not Found`);
    return `Category with "${id}" id deleted`;
  }
}
