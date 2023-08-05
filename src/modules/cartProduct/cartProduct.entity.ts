import {
  Column,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Client } from '../client/client.entity';
import { Cart } from '../cart/cart.entity';
import { Product } from '../product/product.entity';

@Table
export class CartProduct extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ allowNull: false, defaultValue: 1, type: DataType.INTEGER })
  qty: number;

  @ForeignKey(() => Cart)
  @Column({ allowNull: false })
  cartId: number;

  @BelongsTo(() => Cart)
  cart: Cart;

  @ForeignKey(() => Product)
  @Column({ allowNull: false })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;
}
