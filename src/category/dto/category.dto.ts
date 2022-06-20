import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  productCount: number;
}
