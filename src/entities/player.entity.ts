import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClubEntity } from './club.entity';

@Entity('player')
export class PlayerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  nationality: string;

  @ManyToOne((type) => ClubEntity, (club) => club.players, { eager: false })
  club: ClubEntity;

  @Column()
  clubId: number;
}
