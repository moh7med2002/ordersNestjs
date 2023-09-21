import {
  Controller,
  Post,
  UseGuards,
  Param,
  UseInterceptors,
  Body,
  UploadedFile,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomStorage } from 'src/common/util/custom.storage';
import { AdminAddressDto, AdminCreateDto, AdminLoginDto } from './dto';
import { roleAuthGuardFactory } from 'src/common/util/guards.stradegey';
import { SaveUser } from 'src/common/decorator/SaveUser';
import { tokenPayload } from 'src/common/types/token.payload';
import { DeliveryCreateDto } from '../delivery/dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('signup')
  @UseInterceptors(FileInterceptor('image', { storage: CustomStorage.storage }))
  create(
    @Body() dto: AdminCreateDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!image) {
      throw new BadRequestException('image upload is required');
    }
    return this.adminService.createAdmin(dto, image.filename);
  }

  @Post('login')
  login(@Body() dto: AdminLoginDto) {
    return this.adminService.login(dto);
  }

  @Post('address')
  @UseGuards(roleAuthGuardFactory('admin'))
  createAddress(@Body() dto: AdminAddressDto, @SaveUser() user: tokenPayload) {
    return this.adminService.createAddress(dto, user.userId);
  }

  @Get('address')
  @UseGuards(roleAuthGuardFactory('admin'))
  getAddress(@SaveUser() user: tokenPayload) {
    return this.adminService.getAddress(user.userId);
  }

  @Post('delivery/create')
  @UseGuards(roleAuthGuardFactory('admin'))
  @UseInterceptors(FileInterceptor('image', { storage: CustomStorage.storage }))
  createDelivery(
    @Body() dto: DeliveryCreateDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!image) {
      throw new BadRequestException('image upload is required');
    }
    return this.adminService.createDelivery(dto, image.filename);
  }
}
