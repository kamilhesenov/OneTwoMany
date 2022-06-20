import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from '../entities/player.entity';
import { ClubEntity } from '../entities/club.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity, ClubEntity])],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
