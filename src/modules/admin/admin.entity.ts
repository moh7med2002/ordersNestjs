import { Column, Table, Model, DataType, HasMany } from 'sequelize-typescript';
import { Address } from '../address/address.entity';

@Table
export class Admin extends Model {
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

  @Column({ type: DataType.TEXT, allowNull: false, defaultValue: '' })
  description: string;

  @HasMany(() => Address)
  addresses: Address[];
}
