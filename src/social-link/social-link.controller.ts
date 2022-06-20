import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put
} from '@nestjs/common';
import { SocialLinkService } from './social-link.service';
import { SocialLinkDto } from './dto/social-link.dto';
import { SocialLinkEntity } from '../entities/social-link.entity';
import {ApiBody, ApiTags} from '@nestjs/swagger';
import {ProductDto} from "../product/dto/product.dto";

@ApiTags('social-link')
@Controller('social-link')
export class SocialLinkController {
  constructor(private readonly socialLinkService: SocialLinkService) {}

  @Post()
  createSocialLInk(
    @Body() socialLinkDto: SocialLinkDto,
  ): Promise<SocialLinkEntity> {
    return this.socialLinkService.create(socialLinkDto);
  }

  @Get()
  getAllSocialLinks(): Promise<SocialLinkEntity[]> {
    return this.socialLinkService.findAllSocialLinks();
  }

  @Get(':id')
  getSocialLinkById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SocialLinkEntity> {
    return this.socialLinkService.getSocialLinkById(id);
  }

  @Put(':id')
  @ApiBody({type: SocialLinkDto})
  updateSocialLink(
    @Param('id', ParseIntPipe) id: number,
    @Body() socialLinkDto: SocialLinkDto,
  ): Promise<string> {
    return this.socialLinkService.update(id, socialLinkDto);
  }

  @Delete(':id')
  deleteSocialLink(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.socialLinkService.delete(id);
  }
}
