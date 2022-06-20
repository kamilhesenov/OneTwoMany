import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('socialLink')
export class SocialLinkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  link: string;

  @ManyToOne((type) => UserEntity, (user) => user.socialLinks, { eager: false })
  user: UserEntity;

  @Column()
  userId: number;
}
