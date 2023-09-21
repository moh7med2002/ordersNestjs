import { Module } from '@nestjs/common';
import { Admin } from './admin.entity';
import { adminRepositry } from 'src/constants/entityRepositry';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AddressModule } from '../address/address.module';
import { DeliveryModule } from '../delivery/delivery.module';

@Module({
  controllers: [AdminController],
  providers: [
    {
      provide: adminRepositry,
      useValue: Admin,
    },
    AdminService,
  ],
  imports: [AddressModule, DeliveryModule],
})
export class AdminModule {}
