import { IsNotEmpty, IsEmail, Length, IsPhoneNumber } from 'class-validator';

export class AdminCreateDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(3, 10)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsPhoneNumber('PS')
  @IsNotEmpty()
  phone: string;
}

export class AdminLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(3, 10)
  @IsNotEmpty()
  password: string;
}

export class AdminAddressDto {
  @IsNotEmpty()
  lat: string;

  @IsNotEmpty()
  lng: string;

  @IsNotEmpty()
  reference: string;
}
