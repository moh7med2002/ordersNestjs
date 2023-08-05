import { Module } from '@nestjs/common';
import {
  cartProductRepositry,
  notificationRepositry,
} from 'src/constants/entityRepositry';
import { Notification } from './notification.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: notificationRepositry,
      useValue: Notification,
    },
  ],
})
export class NotificationModule {}
