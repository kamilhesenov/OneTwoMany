import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductStatus } from '../product/product-status.enum';
import { CategoryEntity } from './category.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  detail: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  status: ProductStatus;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne((type) => CategoryEntity, (category) => category.products, {
    eager: false,
  })
  category: CategoryEntity;

  @Column()
  categoryId: number;
}
