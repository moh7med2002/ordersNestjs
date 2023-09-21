import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { adminRepositry, clientRepositry } from 'src/constants/entityRepositry';
import { VerifyPassword, hashPassword } from 'src/common/util/passwordUtil';
import { generateToken } from 'src/common/util/generateToken';
import { Client } from './client.entity';
import { MyGateway } from 'src/geteway/geteway';
import {
  AddToCartDto,
  ClientAddressDto,
  ClientCreateDto,
  ClientLoginDto,
} from './dto';
import { clearImage } from 'src/common/util/clearFile';
import { CartService } from '../cart/cart.service';
import { CartProductService } from '../cartProduct/cartProduct.service';
import { ProductService } from '../product/product.service';
import { AddressService } from '../address/address.service';

@Injectable()
export class ClientService {
  constructor(
    @Inject(clientRepositry)
    private clientRepositry: typeof Client,
    private cartService: CartService,
    private cartProductService: CartProductService,
    private productService: ProductService,
    private addressService: AddressService,
    private readonly myGateway: MyGateway,
  ) {}

  async create(dto: ClientCreateDto, image: string) {
    const clinetFound = await this.clientRepositry.findOne({
      where: { email: dto.email, phone: dto.phone },
    });
    if (clinetFound) {
      clearImage(image);
      throw new BadRequestException('Invalid email or phone');
    }
    const hashPs = await hashPassword(dto.password);
    const newClient = await this.clientRepositry.create({
      ...dto,
      image,
      password: hashPs,
    });
    return { msg: 'client has been created' };
  }

  async login(dto: ClientLoginDto) {
    const clientWithEmail = await this.clientRepositry.findOne({
      where: { email: dto.email },
    });
    if (!clientWithEmail) {
      throw new BadRequestException('Invalid Email');
    }
    const isPasswordMatch = await VerifyPassword(
      dto.password,
      clientWithEmail.password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid Password');
    }
    const payload = { role: 'client', userId: clientWithEmail.id };
    const accessToken = generateToken(payload);
    const { password, createdAt, updatedAt, ...other } =
      clientWithEmail.toJSON();
    return { msg: 'client admin success', token: accessToken, client: other };
  }

  async addProrductTocart(dto: AddToCartDto, userId: number) {
    const [user, product] = await Promise.all([
      this.cleintById(userId),
      this.productService.productById(dto.productId),
    ]);
    const cart = await this.cartService.getCart(userId);
    await this.cartProductService.addProductToCart(cart.id, dto.productId);
    this.myGateway.emitCustomEvent(userId + '', {
      msg: `the product ${product.title} has been added to your cart`,
    });
    return { msg: 'product has been added to cart' };
  }

  async removeItemFromCart(dto: AddToCartDto, userId: number) {
    const [user, product] = await Promise.all([
      this.cleintById(userId),
      this.productService.productById(dto.productId),
    ]);
    const cart = await this.cartService.getCart(userId);
    await this.cartProductService.removeItemFromCart(cart.id, dto.productId);
    return { msg: 'product has been removed to cart' };
  }

  async deleteItemFromCart(productId: string, userId: number) {
    const [user, product] = await Promise.all([
      this.cleintById(userId),
      this.productService.productById(productId),
    ]);
    const cart = await this.cartService.getCart(userId);
    await this.cartProductService.deleteItemFromCart(cart.id, productId);
    return { msg: 'product has been deleted to cart' };
  }

  async getAllCartProduct(userId: number) {
    this.cleintById(userId);
    const cart = await this.cartService.getProductsCart(userId);
    return { cart };
  }

  async createAddress(dto: ClientAddressDto, userId: number) {
    await this.cleintById(userId);
    await this.addressService.createClientAddress({ ...dto }, userId);
    return { msg: 'address has been created' };
  }

  async getAddresses(userId: number) {
    await this.cleintById(userId);
    const addresses = await this.addressService.getClientAddresses(userId);
    return { msg: 'success', addresses };
  }

  async cleintById(clientId) {
    const client = await this.clientRepositry.findByPk(clientId);
    if (!client) {
      throw new BadRequestException('client not found');
    }
    return client;
  }
}
