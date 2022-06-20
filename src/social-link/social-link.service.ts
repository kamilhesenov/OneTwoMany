import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {SocialLinkEntity} from '../entities/social-link.entity';
import {Repository} from 'typeorm';
import {UserEntity} from '../entities/user.entity';
import {SocialLinkDto} from './dto/social-link.dto';

@Injectable()
export class SocialLinkService {
    constructor(
        @InjectRepository(SocialLinkEntity)
        private readonly socialLinkRepository: Repository<SocialLinkEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {
    }

    async create(socialLinkDto: SocialLinkDto): Promise<SocialLinkEntity> {
        const user = await this.userRepository.findOne({
            where: {id: socialLinkDto.userId},
        });
        if (!user)
            throw new NotFoundException(
                `User with "${socialLinkDto.userId}" id Not Found`,
            );
        const socialLink = new SocialLinkEntity();
        socialLink.name = socialLinkDto.name;
        socialLink.link = socialLinkDto.link;
        socialLink.user = user;
        const result = await this.socialLinkRepository.save(socialLink);
        return result;
    }

    async findAllSocialLinks(): Promise<SocialLinkEntity[]> {
        return await this.socialLinkRepository
            .createQueryBuilder('socialLink')
            .leftJoinAndSelect('socialLink.user', 'user')
            .getMany();
    }

    async getSocialLinkById(id: number): Promise<SocialLinkEntity> {
        const socialLink = await this.socialLinkRepository
            .createQueryBuilder('socialLink')
            .where('socialLink.userId = :id', {id})
            .leftJoinAndSelect('socialLink.user', 'user')
            .getOne();
        if (!socialLink)
            throw new NotFoundException(`Social Link with "${id}" Not Found`);
        return socialLink;
    }

    async update(id: number, socialLinkDto: SocialLinkDto): Promise<string> {
        const user = await this.userRepository.findOne({
            where: {id: socialLinkDto.userId},
        });
        if (!user)
            throw new NotFoundException(
                `User with "${socialLinkDto.userId}" id Not Found`,
            );
        const {affected} = await this.socialLinkRepository.update(
            id,
            socialLinkDto,
        );
        if (!affected)
            throw new NotFoundException(`Social Link with "${id}" Not Found`);
        return `Social Link with "${id}" updated`;
    }

    async delete(id: number): Promise<string> {
        const {affected} = await this.socialLinkRepository.delete(id);
        if (!affected)
            throw new NotFoundException(`Social Link with "${id}" Not Found`);
        return `Social Link with "${id}" deleted`;
    }
}
