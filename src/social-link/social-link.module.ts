import { Module } from '@nestjs/common';
import { SocialLinkController } from './social-link.controller';
import { SocialLinkService } from './social-link.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialLinkEntity } from '../entities/social-link.entity';
import { UserEntity } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SocialLinkEntity, UserEntity])],
  controllers: [SocialLinkController],
  providers: [SocialLinkService],
})
export class SocialLinkModule {}
