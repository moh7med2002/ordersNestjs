import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { orderRepositry } from 'src/constants/entityRepositry';
import { Order } from './order.entity';
import { OrderDeliveryDto, OrderDto, OrderUpdateDto } from './dto';
import { ClientService } from '../client/client.service';
import { ProductService } from '../product/product.service';
import { DeliveryService } from '../delivery/delivery.service';
import { AddressService } from '../address/address.service';
import { CartService } from '../cart/cart.service';
import { calculateDistance } from 'src/common/util/distance';
import { OrderProductService } from '../orderProduct/orderproduct.service';
import { Transaction, Sequelize } from 'sequelize';
import { CartProductService } from '../cartProduct/cartProduct.service';

@Injectable()
export class OrderService {
  constructor(
    @Inject(orderRepositry)
    private orderRepositry: typeof Order,
    private clientService: ClientService,
    private productService: ProductService,
    private deliveryService: DeliveryService,
    private addressService: AddressService,
    private cartService: CartService,
    private orderProductsService: OrderProductService,
    @Inject('SEQUELIZE')
    private sequelize: Sequelize,
    private cartProductService: CartProductService,
  ) {}

  async createOrder(dto: OrderDto, clientId) {
    const clientPromise = this.clientService.cleintById(clientId);
    const adminAddressPromise = this.addressService.getAdminAddress();
    const clinetAddressPromise = this.addressService.getSingelClientAddress(
      dto.reciverAddressId,
    );
    const cartPromise = this.cartService.getProductsCart(clientId);

    const transaction = await this.sequelize.transaction(); // Start a new transaction

    try {
      const [client, adminAddress, clinetAddress, cart] = await Promise.all([
        clientPromise,
        adminAddressPromise,
        clinetAddressPromise,
        cartPromise,
      ]);

      let productsPrice = 0;
      for (const product of cart.products) {
        const p = product.toJSON();
        productsPrice += p.CartProduct.qty * p.price;
      }

      const distance = calculateDistance(
        +adminAddress.lat,
        +adminAddress.lng,
        +clinetAddress.lat,
        +clinetAddress.lng,
      );
      const deliveryPricePerKilometer = 2;
      const deliveryPrice = distance * deliveryPricePerKilometer;

      const savedOrder = await this.orderRepositry.create(
        {
          productsPrice,
          clientId,
          senderAddressId: adminAddress.id,
          reciverAddressId: clinetAddress.id,
          deliveryPrice,
        },
        { transaction }, // Pass the transaction to the create method
      );

      let orderProducts = [];
      for (const product of cart.products) {
        const p = product.toJSON();
        orderProducts.push({
          orderId: savedOrder.id,
          productId: p.id,
          qty: p.CartProduct.qty,
          price: p.price,
        });
      }

      await this.orderProductsService.addProductToOrder(orderProducts, {
        transaction, // Pass the transaction to the service method
      });

      await this.cartProductService.clearCart(cart.id);
      await transaction.commit();

      return { msg: 'order has been created' };
    } catch (error) {
      await transaction.rollback();

      console.error('Error while creating order:', error);
      throw new Error('Failed to create order');
    }
  }

  async changeStatusOrder(dto: OrderUpdateDto) {
    const order = await this.orderById(dto.orderId);
    order.status = dto.status;
    await order.save();
    return { msg: 'success' };
  }

  async addDeliveryToOrder(dto: OrderDeliveryDto) {
    const orderPromise = this.orderById(dto.orderId);
    const deliveryPromise = this.deliveryService.deliveryById(dto.deliveryId);
    const [order, delivery] = await Promise.all([
      orderPromise,
      deliveryPromise,
    ]);
    order.deliveryId = delivery.id;
    await order.save();
    return { msg: 'success' };
  }

  async orderById(id) {
    const order = await this.orderRepositry.findByPk(id);
    if (!order) {
      throw new BadRequestException('order not found');
    }
    return order;
  }
}
