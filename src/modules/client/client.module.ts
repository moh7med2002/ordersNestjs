import { Module } from '@nestjs/common';
import { clientRepositry } from 'src/constants/entityRepositry';
import { Client } from './client.entity';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { CartModule } from '../cart/cart.module';
import { CartProductModule } from '../cartProduct/cartProduct.module';
import { ProductModule } from '../product/product.module';
import { AddressModule } from '../address/address.module';
import { MyGateway } from 'src/geteway/geteway';

@Module({
  controllers: [ClientController],
  providers: [
    {
      provide: clientRepositry,
      useValue: Client,
    },
    ClientService,
    MyGateway,
  ],
  imports: [CartModule, CartProductModule, ProductModule, AddressModule],
  exports: [ClientService],
})
export class ClientModule {}
