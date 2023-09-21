import { IsNotEmpty, Length, Min } from 'class-validator';

export class ProductCreateDto {
  @Length(3)
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  categoryId: string | number;

  @Min(1)
  @IsNotEmpty()
  price: number;
}

export class ProductUpdateDto {
  @Length(3)
  @IsNotEmpty()
  title: string;

  @Min(1)
  @IsNotEmpty()
  price: number;
}
