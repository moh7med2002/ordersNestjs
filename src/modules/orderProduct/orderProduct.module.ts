import { Module } from '@nestjs/common';
import { orderproductRepositry } from 'src/constants/entityRepositry';
import { OrderProduct } from './orderProduct.entity';
import { OrderProductService } from './orderproduct.service';

@Module({
  controllers: [],
  providers: [
    {
      provide: orderproductRepositry,
      useValue: OrderProduct,
    },
    OrderProductService,
  ],
  exports: [OrderProductService],
})
export class OrderProductModule {}
