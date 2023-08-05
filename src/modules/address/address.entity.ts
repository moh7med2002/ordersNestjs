import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Client } from '../client/client.entity';
import { Admin } from '../admin/admin.entity';
import { Order } from '../order/order.entity';

@Table
export class Address extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  lat: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  lng: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  reference: string;

  @ForeignKey(() => Client)
  @Column({})
  clientId: number;

  @BelongsTo(() => Client)
  client: Client;

  @ForeignKey(() => Admin)
  @Column({})
  adminId: number;

  @BelongsTo(() => Admin)
  admin: Admin;

  @HasMany(() => Order, 'reciverAddressId')
  recieversOrder: Order[];

  @HasMany(() => Order, 'senderAddressId')
  sendersOrder: Order[];
}
