import { Injectable, Inject } from '@nestjs/common';
import { cartProductRepositry } from 'src/constants/entityRepositry';
import { CartProduct } from './cartProduct.entity';

@Injectable()
export class CartProductService {
  constructor(
    @Inject(cartProductRepositry)
    private cartProductRepositry: typeof CartProduct,
  ) {}

  async addProductToCart(cartId, productId) {
    const existingCartProduct = await this.cartProductRepositry.findOne({
      where: {
        cartId,
        productId,
      },
    });
    if (existingCartProduct) {
      existingCartProduct.qty += 1;
      await existingCartProduct.save();
    } else {
      await this.cartProductRepositry.create({
        qty: 1,
        cartId,
        productId,
      });
    }
  }

  async removeItemFromCart(cartId, productId) {
    const existingCartProduct = await this.cartProductRepositry.findOne({
      where: {
        cartId,
        productId,
      },
    });
    if (existingCartProduct) {
      if (existingCartProduct.qty > 1) {
        existingCartProduct.qty -= 1;
        await existingCartProduct.save();
      }
    }
  }

  async deleteItemFromCart(cartId, productId) {
    await this.cartProductRepositry.destroy({
      where: {
        cartId,
        productId,
      },
    });
  }

  async clearCart(cartId) {
    await this.cartProductRepositry.destroy({ where: { cartId: cartId } });
  }
}
