import { Module } from '@nestjs/common';
import { cartRepositry } from 'src/constants/entityRepositry';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';

@Module({
  controllers: [],
  providers: [
    {
      provide: cartRepositry,
      useValue: Cart,
    },
    CartService,
  ],
  exports: [CartService],
})
export class CartModule {}
