import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { addressRepositry } from 'src/constants/entityRepositry';
import { Address } from './address.entity';
import { Op } from 'sequelize';

type data = {
  lng: string;
  lat: string;
  reference: string;
};

@Injectable()
export class AddressService {
  constructor(
    @Inject(addressRepositry)
    private addressRepositry: typeof Address,
  ) {}

  async createAdminAddress(data: data, adminId) {
    const existAddress = await this.addressRepositry.findOne({
      where: { adminId },
    });
    if (existAddress) {
      existAddress.lat = data.lat;
      existAddress.lng = data.lng;
      existAddress.reference = data.reference;
      await existAddress.save();
    } else {
      await this.addressRepositry.create({
        ...data,
        adminId,
      });
    }
  }

  async createClientAddress(data: data, clientId) {
    await this.addressRepositry.create({
      ...data,
      clientId,
    });
  }

  async getAdminAddress() {
    const address = await this.addressRepositry.findOne({
      where: {
        adminId: { [Op.ne]: null },
      },
      attributes: { exclude: ['clientId'] },
    });
    return address;
  }

  async getSingelClientAddress(addressId) {
    const address = await this.addressRepositry.findByPk(addressId);
    if (!address) {
      throw new BadRequestException('address not found');
    }
    return address;
  }

  async getClientAddresses(clientId) {
    const addresses = await this.addressRepositry.findAll({
      where: { clientId },
      attributes: { exclude: ['adminId'] },
    });
    return { addresses };
  }
}
