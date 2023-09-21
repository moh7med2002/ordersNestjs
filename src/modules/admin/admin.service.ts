import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Admin } from './admin.entity';
import { adminRepositry } from 'src/constants/entityRepositry';
import { AdminAddressDto, AdminCreateDto, AdminLoginDto } from './dto';
import { VerifyPassword, hashPassword } from 'src/common/util/passwordUtil';
import { generateToken } from 'src/common/util/generateToken';
import { AddressService } from '../address/address.service';
import { DeliveryService } from '../delivery/delivery.service';
import { DeliveryCreateDto } from '../delivery/dto';

@Injectable()
export class AdminService {
  constructor(
    @Inject(adminRepositry)
    private adminRepository: typeof Admin,
    private addressService: AddressService,
    private deliveryService: DeliveryService,
  ) {}

  async createAdmin(dto: AdminCreateDto, image: string) {
    const adminCount = await this.adminRepository.count();
    if (adminCount !== 0) {
      throw new BadRequestException('admin creation failed');
    }
    const hashPs = await hashPassword(dto.password);
    const newAdmin = await this.adminRepository.create({
      ...dto,
      image,
      password: hashPs,
    });
    return { msg: 'admin has been created' };
  }

  async login(dto: AdminLoginDto) {
    const adminWithEmail = await this.adminRepository.findOne({
      where: { email: dto.email },
    });
    if (!adminWithEmail) {
      throw new BadRequestException('Invalid Email');
    }
    const isPasswordMatch = await VerifyPassword(
      dto.password,
      adminWithEmail.password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid Password');
    }
    const payload = { role: 'admin', userId: adminWithEmail.id };
    const accessToken = generateToken(payload);
    const { password, createdAt, updatedAt, ...other } =
      adminWithEmail.toJSON();
    return { msg: 'login admin success', token: accessToken, admin: other };
  }

  async createAddress(dto: AdminAddressDto, adminId: number) {
    await this.adminById(adminId);
    await this.addressService.createAdminAddress(dto, adminId);
    return { msg: 'address has been created' };
  }

  async getAddress(adminId: number) {
    await this.adminById(adminId);
    const address = await this.addressService.getAdminAddress();
    return { address, msg: 'get admin address success' };
  }

  async adminById(adminId) {
    const admin = await this.adminRepository.findByPk(adminId);
    if (!admin) {
      throw new BadRequestException('admin not found');
    }
    return admin;
  }

  async createDelivery(dto: DeliveryCreateDto, image: string) {
    await this.deliveryService.create(dto, image);
    return { msg: 'delivery has been created' };
  }
}
