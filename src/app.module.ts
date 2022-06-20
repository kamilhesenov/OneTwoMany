import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ClubModule } from './club/club.module';
import { PlayerModule } from './player/player.module';
import { UserModule } from './user/user.module';
import { SocialLinkModule } from './social-link/social-link.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ClubModule,
    PlayerModule,
    UserModule,
    SocialLinkModule,
    CategoryModule,
    ProductModule,
  ],
})
export class AppModule {}
