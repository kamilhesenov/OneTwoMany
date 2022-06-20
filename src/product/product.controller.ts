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
import {ProductService} from './product.service';
import {ProductDto} from './dto/product.dto';
import {ProductEntity} from '../entities/product.entity';
import {ApiBody, ApiTags} from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @Post()
    createProduct(@Body() productDto: ProductDto): Promise<ProductEntity> {
        return this.productService.create(productDto);
    }

    @Get()
    getAllProducts(): Promise<ProductEntity[]> {
        return this.productService.findAllProduct();
    }

    @Get(':id')
    getProductById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ProductEntity> {
        return this.productService.findProductById(id);
    }

    @Put(':id')
    @ApiBody({type: ProductDto})
    updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() productDto: ProductDto,
    ): Promise<string> {
        return this.productService.update(id, productDto);
    }

    @Delete(':id')
    deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return this.productService.delete(id);
    }
}
