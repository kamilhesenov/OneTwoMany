import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ProductStatus } from '../product-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  detail: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    enum: Object.values(ProductStatus),
  })
  @IsNotEmpty()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
