import { Module } from '@nestjs/common';
import { productRepositry } from 'src/constants/entityRepositry';
import { Product } from './product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategoryModule } from '../category/category.module';

@Module({
  controllers: [ProductController],
  providers: [
    {
      provide: productRepositry,
      useValue: Product,
    },
    ProductService,
  ],
  imports: [CategoryModule],
  exports: [ProductService],
})
export class ProductModule {}
