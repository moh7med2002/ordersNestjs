import { Column, Table, Model, DataType, HasMany } from 'sequelize-typescript';
import { Notification } from '../notification/notification.entity';
import { Order } from '../order/order.entity';

@Table
export class Delivery extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '',
    unique: true,
  })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  phone: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  image: string;

  @HasMany(() => Notification)
  notifications: Notification[];

  @HasMany(() => Order)
  orders: Order[];
}
