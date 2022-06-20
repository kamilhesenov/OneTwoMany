import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClubEntity } from '../entities/club.entity';
import { getRepository, Repository } from 'typeorm';
import { ClubDto } from './dto/club.dto';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>,
  ) {}

  async create(clubDto: ClubDto): Promise<ClubEntity> {
    const club = new ClubEntity();
    club.name = clubDto.name;
    club.country = clubDto.country;
    const result = await this.clubRepository.save(club);
    return result;
  }

  async findAllClubs(): Promise<ClubEntity[]> {
    return await this.clubRepository.find();
  }

  async findClubById(id: number): Promise<ClubEntity> {
    const club = await this.clubRepository.findOne({ where: { id } });
    if (!club) throw new NotFoundException(`Club with "${id}" id Not Found`);
    return club;
  }

  async update(id: number, clubDto: ClubDto): Promise<string> {
    const { affected } = await this.clubRepository.update(id, clubDto);
    if (!affected)
      throw new NotFoundException(`Club with "${id}" id Not Found`);
    return `Club with "${id}" id updated`;
  }

  async delete(id: number): Promise<string> {
    const { affected } = await this.clubRepository.delete(id);
    if (!affected)
      throw new NotFoundException(`Club with "${id}" id Not Found`);
    return `Club with "${id}" id deleted`;
  }
}
