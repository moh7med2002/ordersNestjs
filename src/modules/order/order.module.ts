import { Module } from '@nestjs/common';
import { orderRepositry } from 'src/constants/entityRepositry';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { ProductModule } from '../product/product.module';
import { DeliveryModule } from '../delivery/delivery.module';
import { ClientModule } from '../client/client.module';
import { AddressModule } from '../address/address.module';
import { CartModule } from '../cart/cart.module';
import { OrderController } from './order.controller';
import { OrderProductModule } from '../orderProduct/orderProduct.module';
import { DatabaseModule } from 'src/database/database.module';
import { CartProductModule } from '../cartProduct/cartProduct.module';

@Module({
  controllers: [OrderController],
  providers: [
    {
      provide: orderRepositry,
      useValue: Order,
    },
    OrderService,
  ],
  imports: [
    ProductModule,
    DeliveryModule,
    ClientModule,
    AddressModule,
    CartModule,
    OrderProductModule,
    DatabaseModule,
    CartProductModule,
  ],
})
export class OrderModule {}
