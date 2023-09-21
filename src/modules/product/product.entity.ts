import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  Scopes,
} from 'sequelize-typescript';
import { Category } from '../category/category.entity';
import { Cart } from '../cart/cart.entity';
import { CartProduct } from '../cartProduct/cartProduct.entity';
import { OrderProduct } from '../orderProduct/orderProduct.entity';
import { Order } from '../order/order.entity';

@Table
@Scopes(() => ({
  withoutTimeStamps: {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  },
}))
export class Product extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  image: string;

  @Column({ type: DataType.DOUBLE, allowNull: false, defaultValue: 0 })
  price: number;

  @ForeignKey(() => Category)
  @Column({ allowNull: false })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @BelongsToMany(() => Cart, () => CartProduct)
  carts: CartProduct[];

  @BelongsToMany(() => Order, () => OrderProduct)
  orders: OrderProduct[];
}
