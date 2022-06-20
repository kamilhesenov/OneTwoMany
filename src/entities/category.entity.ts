import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  productCount: number;

  @OneToMany((type) => ProductEntity, (product) => product.category, {
    eager: true,
  })
  products: ProductEntity[];
}
