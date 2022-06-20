import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class PlayerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  nationality: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  clubId: number;
}
