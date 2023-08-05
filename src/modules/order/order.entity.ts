import {
  Column,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  DataType,
} from 'sequelize-typescript';
import { Client } from '../client/client.entity';
import { Product } from '../product/product.entity';
import { Delivery } from '../delivery/delivery.entity';
import { Address } from '../address/address.entity';
import { OrderStatus } from 'src/constants/enums';
import { OrderProduct } from '../orderProduct/orderProduct.entity';

@Table
export class Order extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ allowNull: false, type: DataType.DOUBLE, defaultValue: 0 })
  productsPrice: number;

  @Column({ allowNull: false, type: DataType.DOUBLE, defaultValue: 0 })
  deliveryPrice: number;

  @ForeignKey(() => Client)
  @Column({ allowNull: false })
  clientId: number;

  @BelongsTo(() => Client)
  client: Client;

  @ForeignKey(() => Delivery)
  @Column({})
  deliveryId: number;

  @BelongsTo(() => Delivery)
  delivery: Delivery;

  @ForeignKey(() => Address)
  @Column({})
  senderAddressId: number;

  @BelongsTo(() => Address)
  senderAddress: Address;

  @ForeignKey(() => Address)
  @Column({})
  reciverAddressId: number;

  @BelongsTo(() => Address)
  reciverAddress: Address;

  @Column({
    type: DataType.ENUM(
      OrderStatus.DELIVERED,
      OrderStatus.ONWAY,
      OrderStatus.PENDING,
      OrderStatus.ACCEPTED,
      OrderStatus.CANCELED,
    ),
    defaultValue: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @BelongsToMany(() => Product, () => OrderProduct)
  orders: OrderProduct[];
}
