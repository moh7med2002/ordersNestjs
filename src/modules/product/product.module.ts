import { Module } from '@nestjs/common';
import { productRepositry } from 'src/constants/entityRepositry';
import { Product } from './product.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: productRepositry,
      useValue: Product,
    },
  ],
})
export class ProductModule {}
