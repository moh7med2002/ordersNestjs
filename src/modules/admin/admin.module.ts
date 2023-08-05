import { Module } from '@nestjs/common';
import { Admin } from './admin.entity';
import { adminRepositry } from 'src/constants/entityRepositry';

@Module({
  controllers: [],
  providers: [
    {
      provide: adminRepositry,
      useValue: Admin,
    },
  ],
})
export class AdminModule {}
