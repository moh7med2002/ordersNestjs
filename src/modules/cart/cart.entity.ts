import {
  Column,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { Client } from '../client/client.entity';
import { Product } from '../product/product.entity';
import { CartProduct } from '../cartProduct/cartProduct.entity';

@Table
export class Cart extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Client)
  @Column({ allowNull: false })
  clientId: number;

  @BelongsTo(() => Client)
  client: Client;

  @BelongsToMany(() => Product, () => CartProduct)
  products: CartProduct[];
}
