import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class SocialLinkDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  link: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
