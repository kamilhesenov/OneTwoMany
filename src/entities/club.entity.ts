import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlayerEntity } from './player.entity';

@Entity('club')
export class ClubEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @OneToMany((type) => PlayerEntity, (player) => player.club, { eager: true })
  players: PlayerEntity[];
}
