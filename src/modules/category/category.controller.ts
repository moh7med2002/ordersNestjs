import {
  Controller,
  Post,
  UseGuards,
  Param,
  Body,
  BadRequestException,
  Put,
  Get,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { roleAuthGuardFactory } from 'src/common/util/guards.stradegey';
import { categoryDto } from './dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('create')
  @UseGuards(roleAuthGuardFactory('admin'))
  createCategory(@Body() dto: categoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Put('update/:categoryId')
  @UseGuards(roleAuthGuardFactory('admin'))
  updateCategory(
    @Body() dto: categoryDto,
    @Param('categoryId') categoryId: string,
  ) {
    return this.categoryService.updateCategory(dto, categoryId);
  }

  @Get('all')
  getAll() {
    return this.categoryService.fetchAll();
  }

  @Get(':categoryId')
  fetchCategoryProduct(@Param('categoryId') categoryId: string) {
    return this.categoryService.fetchCategoryProduct(categoryId);
  }
}
