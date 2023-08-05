import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MulterModule } from '@nestjs/platform-express';
import { CustomStorage } from './common/util/custom.storage';
import { JwtModule } from '@nestjs/jwt';
import { GatewayModule } from './geteway/geteway.module';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './modules/admin/admin.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { ClientModule } from './modules/client/client.module';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { AddressModule } from './modules/address/address.module';
import { CartModule } from './modules/cart/cart.module';
import { CartProductModule } from './modules/cartProduct/cartProduct.module';
import { NotificationModule } from './modules/notification/notification.module';
import { OrderModule } from './modules/order/order.module';
import { OrderProductModule } from './modules/orderProduct/orderProduct.module';

@Module({
  imports: [
    JwtModule.register({ global: true, secret: 'token' }),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: CustomStorage.storage,
      }),
    }),
    DatabaseModule,
    GatewayModule,
    AdminModule,
    CategoryModule,
    ProductModule,
    ClientModule,
    DeliveryModule,
    AddressModule,
    CartModule,
    CartProductModule,
    NotificationModule,
    OrderModule,
    OrderProductModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
