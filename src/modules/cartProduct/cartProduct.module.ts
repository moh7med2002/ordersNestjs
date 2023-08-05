import { Module } from '@nestjs/common';
import { cartProductRepositry } from 'src/constants/entityRepositry';
import { CartProduct } from './cartProduct.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: cartProductRepositry,
      useValue: CartProduct,
    },
  ],
})
export class CartProductModule {}
