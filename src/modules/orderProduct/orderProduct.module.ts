import { Module } from '@nestjs/common';
import { orderproductRepositry } from 'src/constants/entityRepositry';
import { OrderProduct } from './orderProduct.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: orderproductRepositry,
      useValue: OrderProduct,
    },
  ],
})
export class OrderProductModule {}
