import { Module } from '@nestjs/common';
import { addressRepositry } from 'src/constants/entityRepositry';
import { Address } from './address.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: addressRepositry,
      useValue: Address,
    },
  ],
})
export class AddressModule {}
