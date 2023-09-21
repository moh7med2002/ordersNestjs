import {
  Controller,
  Post,
  UseGuards,
  Param,
  UseInterceptors,
  Body,
  UploadedFile,
  BadRequestException,
  Delete,
  Get,
} from '@nestjs/common';
import { DeliveryLoginDto } from './dto';
import { roleAuthGuardFactory } from 'src/common/util/guards.stradegey';
import { SaveUser } from 'src/common/decorator/SaveUser';
import { tokenPayload } from 'src/common/types/token.payload';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
  constructor(private dliveryService: DeliveryService) {}

  @Post('login')
  login(@Body() dto: DeliveryLoginDto) {
    return this.dliveryService.login(dto);
  }
}
