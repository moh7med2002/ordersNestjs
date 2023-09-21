import { IsNotEmpty, IsEnum } from 'class-validator';
import { OrderStatus } from 'src/constants/enums';

export class OrderDto {
  @IsNotEmpty()
  reciverAddressId: string | number;
}

export class OrderUpdateDto {
  @IsNotEmpty()
  orderId: string | number;

  @IsEnum(OrderStatus, { message: 'enter a valid value' })
  status: OrderStatus;
}

export class OrderDeliveryDto {
  @IsNotEmpty()
  orderId: string | number;

  @IsNotEmpty()
  deliveryId: string | number;
}
