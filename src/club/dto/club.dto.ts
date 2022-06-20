import { IsNotEmpty, IsOptional } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class ClubDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  country: string;
}
