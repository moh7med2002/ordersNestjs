import { Module } from '@nestjs/common';
import { cartRepositry } from 'src/constants/entityRepositry';
import { Cart } from './cart.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: cartRepositry,
      useValue: Cart,
    },
  ],
})
export class CartModule {}
