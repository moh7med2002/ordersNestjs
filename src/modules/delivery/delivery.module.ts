import { Module } from '@nestjs/common';
import { deliveryRepositry } from 'src/constants/entityRepositry';
import { Delivery } from './delivery.entity';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';

@Module({
  controllers: [DeliveryController],
  providers: [
    {
      provide: deliveryRepositry,
      useValue: Delivery,
    },
    DeliveryService,
  ],
  exports: [DeliveryService],
})
export class DeliveryModule {}
