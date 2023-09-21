import {
  IsNotEmpty,
  IsEmail,
  Length,
  IsPhoneNumber,
  Min,
} from 'class-validator';

export class ClientCreateDto {
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

export class ClientLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(3, 10)
  @IsNotEmpty()
  password: string;
}

export class AddToCartDto {
  @IsNotEmpty()
  productId: string | number;
}

export class ClientAddressDto {
  @IsNotEmpty()
  lat: string;

  @IsNotEmpty()
  lng: string;

  @IsNotEmpty()
  reference: string;
}
