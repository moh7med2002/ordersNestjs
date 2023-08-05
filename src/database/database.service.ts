import { Sequelize } from 'sequelize-typescript';
import { Address } from 'src/modules/address/address.entity';
import { Admin } from 'src/modules/admin/admin.entity';
import { Cart } from 'src/modules/cart/cart.entity';
import { CartProduct } from 'src/modules/cartProduct/cartProduct.entity';
import { Category } from 'src/modules/category/category.entity';
import { Client } from 'src/modules/client/client.entity';
import { Delivery } from 'src/modules/delivery/delivery.entity';
import { Notification } from 'src/modules/notification/notification.entity';
import { NotificationModule } from 'src/modules/notification/notification.module';
import { Order } from 'src/modules/order/order.entity';
import { OrderProduct } from 'src/modules/orderProduct/orderProduct.entity';
import { Product } from 'src/modules/product/product.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '059283805928388',
        database: 'resturant',
      });
      sequelize.addModels([
        Admin,
        Category,
        Product,
        Client,
        Delivery,
        Address,
        Cart,
        CartProduct,
        Notification,
        Order,
        OrderProduct,
      ]);
      await sequelize.sync({ force: !true });
      return sequelize;
    },
  },
];
