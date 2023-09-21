import { Module } from '@nestjs/common';
import { cartProductRepositry } from 'src/constants/entityRepositry';
import { CartProduct } from './cartProduct.entity';
import { CartProductService } from './cartProduct.service';

@Module({
  controllers: [],
  providers: [
    {
      provide: cartProductRepositry,
      useValue: CartProduct,
    },
    CartProductService,
  ],
  exports: [CartProductService],
})
export class CartProductModule {}
