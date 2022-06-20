import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
