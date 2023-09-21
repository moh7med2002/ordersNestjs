import { Injectable, Inject } from '@nestjs/common';
import { orderproductRepositry } from 'src/constants/entityRepositry';
import { OrderProduct } from './orderProduct.entity';

@Injectable()
export class OrderProductService {
  constructor(
    @Inject(orderproductRepositry)
    private orderproductRepositry: typeof OrderProduct,
  ) {}

  async addProductToOrder(products, options) {
    await this.orderproductRepositry.bulkCreate(products, options);
  }
}
