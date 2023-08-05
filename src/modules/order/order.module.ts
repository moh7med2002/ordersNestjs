import { Module } from '@nestjs/common';
import { orderRepositry } from 'src/constants/entityRepositry';
import { Order } from './order.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: orderRepositry,
      useValue: Order,
    },
  ],
})
export class OrderModule {}
