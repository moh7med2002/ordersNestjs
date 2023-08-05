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
import { Delivery } from '../delivery/delivery.entity';

@Table
export class Notification extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ allowNull: false, defaultValue: '', type: DataType.STRING })
  text: string;

  @Column({ allowNull: false, defaultValue: false, type: DataType.BOOLEAN })
  isAdmin: boolean;

  @ForeignKey(() => Client)
  @Column({})
  clientId: number;

  @BelongsTo(() => Client)
  client: Client;

  @ForeignKey(() => Delivery)
  @Column({})
  deliveryId: number;

  @BelongsTo(() => Delivery)
  delivery: Delivery;
}
