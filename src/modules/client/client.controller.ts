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
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomStorage } from 'src/common/util/custom.storage';
import { ClientService } from './client.service';
import {
  AddToCartDto,
  ClientAddressDto,
  ClientCreateDto,
  ClientLoginDto,
} from './dto';
import { roleAuthGuardFactory } from 'src/common/util/guards.stradegey';
import { SaveUser } from 'src/common/decorator/SaveUser';
import { tokenPayload } from 'src/common/types/token.payload';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post('signup')
  @UseInterceptors(FileInterceptor('image', { storage: CustomStorage.storage }))
  create(
    @Body() dto: ClientCreateDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!image) {
      throw new BadRequestException('image upload is required');
    }
    return this.clientService.create(dto, image.filename);
  }

  @Post('login')
  login(@Body() dto: ClientLoginDto) {
    return this.clientService.login(dto);
  }

  @Post('cart')
  @UseGuards(roleAuthGuardFactory('client'))
  addItemToCart(@Body() dto: AddToCartDto, @SaveUser() user: tokenPayload) {
    return this.clientService.addProrductTocart(dto, user.userId);
  }

  @Post('cart/decrease')
  @UseGuards(roleAuthGuardFactory('client'))
  removeItemToCart(@Body() dto: AddToCartDto, @SaveUser() user: tokenPayload) {
    return this.clientService.removeItemFromCart(dto, user.userId);
  }

  @Delete('cart/:productId')
  @UseGuards(roleAuthGuardFactory('client'))
  deleteItemToCart(
    @SaveUser() user: tokenPayload,
    @Param('productId') productId: string,
  ) {
    return this.clientService.deleteItemFromCart(productId, user.userId);
  }

  @Get('cart')
  @UseGuards(roleAuthGuardFactory('client'))
  getCartProducts(@SaveUser() user: tokenPayload) {
    return this.clientService.getAllCartProduct(user.userId);
  }

  @Post('address')
  @UseGuards(roleAuthGuardFactory('client'))
  createAddress(@Body() dto: ClientAddressDto, @SaveUser() user: tokenPayload) {
    return this.clientService.createAddress(dto, user.userId);
  }

  @Get('address')
  @UseGuards(roleAuthGuardFactory('client'))
  getAddresses(@SaveUser() user: tokenPayload) {
    return this.clientService.getAddresses(user.userId);
  }
}
