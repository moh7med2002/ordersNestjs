import {
  IsNotEmpty,
  IsEmail,
  Length,
  IsPhoneNumber,
  Min,
} from 'class-validator';

export class DeliveryCreateDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(3, 10)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsPhoneNumber('PS')
  @IsNotEmpty()
  phone: string;
}

export class DeliveryLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(3, 10)
  @IsNotEmpty()
  password: string;
}
