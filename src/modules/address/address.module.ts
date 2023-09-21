import { Module } from '@nestjs/common';
import { addressRepositry } from 'src/constants/entityRepositry';
import { Address } from './address.entity';
import { AddressService } from './address.service';

@Module({
  controllers: [],
  providers: [
    {
      provide: addressRepositry,
      useValue: Address,
    },
    AddressService,
  ],
  exports: [AddressService],
})
export class AddressModule {}
