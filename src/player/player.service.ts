import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {PlayerEntity} from '../entities/player.entity';
import {Repository} from 'typeorm';
import {PlayerDto} from './dto/player.dto';
import {ClubEntity} from '../entities/club.entity';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(PlayerEntity)
        private readonly playerRepository: Repository<PlayerEntity>,
        @InjectRepository(ClubEntity)
        private readonly clubRepository: Repository<ClubEntity>,
    ) {
    }

    async create(playerDto: PlayerDto): Promise<PlayerEntity> {
        const club = await this.clubRepository.findOne({
            where: {id: playerDto.clubId},
        });
        if (!club)
            throw new NotFoundException(
                `Club with "${playerDto.clubId}" id Not Found`,
            );
        const player = new PlayerEntity();
        player.name = playerDto.name;
        player.age = playerDto.age;
        player.nationality = playerDto.nationality;
        player.club = club;
        const result = await this.playerRepository.save(player);
        return result;
    }

    async findAllPlayers(): Promise<PlayerEntity[]> {
        return await this.playerRepository
            .createQueryBuilder('player')
            .leftJoinAndSelect('player.club', 'club')
            .getMany();
    }

    async findPlayerById(id: number): Promise<PlayerEntity> {
        const player = await this.playerRepository
                     .createQueryBuilder('player')
                     .where('player.clubId = :id', {id})
                     .leftJoinAndSelect('player.club', 'club')
                     .getOne();
        if (!player)
            throw new NotFoundException(`Player with "${id}" id Not Found`);
        return player;
    }

    async update(id: number, playerDto: PlayerDto): Promise<string> {
        const club = await this.clubRepository.findOne({
            where: {id: playerDto.clubId},
        });
        if (!club)
            throw new NotFoundException(
                `Club with "${playerDto.clubId}" id Not Found`,
            );
        const {affected} = await this.playerRepository.update(id, playerDto);
        if (!affected)
            throw new NotFoundException(`Player with "${id}" id Not Found`);
        return `Player with "${id}" id updated`;
    }

    async delete(id: number): Promise<string> {
        const {affected} = await this.playerRepository.delete(id);
        if (!affected)
            throw new NotFoundException(`Player with "${id}" id Not Found`);
        return `Player with "${id}" id deleted`;
    }
}
