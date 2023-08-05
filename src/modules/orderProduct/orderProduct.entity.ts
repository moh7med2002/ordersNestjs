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
import { Order } from '../order/order.entity';

@Table
export class OrderProduct extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ allowNull: false, defaultValue: 1, type: DataType.INTEGER })
  qty: number;

  @Column({ allowNull: false, defaultValue: 1, type: DataType.DOUBLE })
  price: number;

  @ForeignKey(() => Order)
  @Column({ allowNull: false })
  orderId: number;

  @BelongsTo(() => Order)
  order: Order;

  @ForeignKey(() => Product)
  @Column({ allowNull: false })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;
}
