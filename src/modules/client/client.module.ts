import { Module } from '@nestjs/common';
import { clientRepositry } from 'src/constants/entityRepositry';
import { Client } from './client.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: clientRepositry,
      useValue: Client,
    },
  ],
})
export class ClientModule {}
