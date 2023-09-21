import {
  Controller,
  Post,
  UseGuards,
  Param,
  UseInterceptors,
  Body,
  UploadedFile,
  BadRequestException,
  Delete,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomStorage } from 'src/common/util/custom.storage';
import { ProductService } from './product.service';
import { ProductCreateDto, ProductUpdateDto } from './dto';
import { roleAuthGuardFactory } from 'src/common/util/guards.stradegey';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('create')
  @UseGuards(roleAuthGuardFactory('admin'))
  @UseInterceptors(FileInterceptor('image', { storage: CustomStorage.storage }))
  create(
    @Body() dto: ProductCreateDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!image) {
      throw new BadRequestException('image upload is required');
    }
    return this.productService.createProduct(dto, image.filename);
  }

  @Post('update/:productId')
  @UseGuards(roleAuthGuardFactory('admin'))
  @UseInterceptors(FileInterceptor('image', { storage: CustomStorage.storage }))
  update(
    @Body() dto: ProductUpdateDto,
    @Param('productId') productId: string,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.productService.updateProduct(
      dto,
      productId,
      image ? image.filename : undefined,
    );
  }

  @Delete(':productId')
  @UseGuards(roleAuthGuardFactory('admin'))
  deleteProduct(@Param('productId') productId: string) {
    return this.productService.deleteProduct(productId);
  }

  @Get('all')
  fetchAll() {
    return this.productService.fetchAllProucts();
  }

  @Get(':productId')
  fetchSingelProduct(@Param('productId') productId: string) {
    return this.productService.fetchSingleProduct(productId);
  }
}
