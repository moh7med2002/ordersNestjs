import { Injectable, Inject } from '@nestjs/common';
import { cartRepositry } from 'src/constants/entityRepositry';
import { Cart } from './cart.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class CartService {
  constructor(
    @Inject(cartRepositry)
    private cartRepositry: typeof Cart,
  ) {}

  async getCart(clientId) {
    const cart = await this.cartRepositry.findOrCreate({
      where: { clientId: clientId },
      defaults: { clientId },
    });
    return cart[0];
  }

  async getProductsCart(clientId) {
    const cart = await this.cartRepositry.findOne({
      where: { clientId: clientId },
      include: [
        {
          model: Product,
        },
      ],
    });
    return cart;
  }
}
