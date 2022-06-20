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
import {CategoryService} from './category.service';
import {CategoryDto} from './dto/category.dto';
import {CategoryEntity} from '../entities/category.entity';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {
    }

    @Post()
    createCategory(@Body() categoryDto: CategoryDto): Promise<CategoryEntity> {
        return this.categoryService.create(categoryDto);
    }

    @Get()
    getAllCategories(): Promise<CategoryEntity[]> {
        return this.categoryService.findAllCategories();
    }

    @Get(':id')
    getCategoryById(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.findCategoryById(id);
    }

    @Put(':id')
    updateCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() categoryDto: CategoryDto,
    ): Promise<string> {
        return this.categoryService.update(id, categoryDto);
    }

    @Delete(':id')
    deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return this.categoryService.delete(id);
    }
}
