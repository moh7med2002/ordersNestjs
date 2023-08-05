import { Module } from '@nestjs/common';
import { deliveryRepositry } from 'src/constants/entityRepositry';
import { Delivery } from './delivery.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: deliveryRepositry,
      useValue: Delivery,
    },
  ],
})
export class DeliveryModule {}
