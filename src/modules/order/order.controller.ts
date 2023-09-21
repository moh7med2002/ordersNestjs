import {
  Controller,
  Post,
  UseGuards,
  Param,
  Body,
  BadRequestException,
  Get,
  Put,
} from '@nestjs/common';
import { roleAuthGuardFactory } from 'src/common/util/guards.stradegey';
import { SaveUser } from 'src/common/decorator/SaveUser';
import { tokenPayload } from 'src/common/types/token.payload';
import { OrderService } from './order.service';
import { OrderDeliveryDto, OrderDto, OrderUpdateDto } from './dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('user/create')
  @UseGuards(roleAuthGuardFactory('client'))
  createOrder(@Body() dto: OrderDto, @SaveUser() user: tokenPayload) {
    return this.orderService.createOrder(dto, user.userId);
  }

  @Put('status')
  @UseGuards()
  updateOrderStatus(@Body() dto: OrderUpdateDto) {
    return this.orderService.changeStatusOrder(dto);
  }

  @Put('delivery')
  @UseGuards(roleAuthGuardFactory('admin'))
  addDeliveryToOrder(@Body() dto: OrderDeliveryDto) {
    return this.orderService.addDeliveryToOrder(dto);
  }
}
