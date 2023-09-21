import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { deliveryRepositry } from 'src/constants/entityRepositry';
import { VerifyPassword, hashPassword } from 'src/common/util/passwordUtil';
import { generateToken } from 'src/common/util/generateToken';
import { DeliveryCreateDto, DeliveryLoginDto } from './dto';
import { clearImage } from 'src/common/util/clearFile';
import { Delivery } from './delivery.entity';

@Injectable()
export class DeliveryService {
  constructor(
    @Inject(deliveryRepositry)
    private deliveryRepositry: typeof Delivery,
  ) {}

  async create(dto: DeliveryCreateDto, image: string) {
    const deliveryFound = await this.deliveryRepositry.findOne({
      where: { email: dto.email, phone: dto.phone },
    });
    if (deliveryFound) {
      clearImage(image);
      throw new BadRequestException('Invalid email or phone');
    }
    const hashPs = await hashPassword(dto.password);
    const newDelivery = await this.deliveryRepositry.create({
      ...dto,
      image,
      password: hashPs,
    });
    return { msg: 'delivery has been created' };
  }

  async login(dto: DeliveryLoginDto) {
    const deliveryWithEmail = await this.deliveryRepositry.findOne({
      where: { email: dto.email },
    });
    if (!deliveryWithEmail) {
      throw new BadRequestException('Invalid Email');
    }
    const isPasswordMatch = await VerifyPassword(
      dto.password,
      deliveryWithEmail.password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid Password');
    }
    const payload = { role: 'delivery', userId: deliveryWithEmail.id };
    const accessToken = generateToken(payload);
    const { password, createdAt, updatedAt, ...other } =
      deliveryWithEmail.toJSON();
    return {
      msg: 'deivery admin success',
      token: accessToken,
      delivery: other,
    };
  }

  async deliveryById(deliveryId) {
    const delivery = await this.deliveryRepositry.findByPk(deliveryId);
    if (!delivery) {
      throw new BadRequestException('delivery not found');
    }
    return delivery;
  }
}
