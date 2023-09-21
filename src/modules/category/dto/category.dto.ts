import { IsNotEmpty, Length } from 'class-validator';

export class categoryDto {
  @Length(3)
  @IsNotEmpty()
  title: string;
}
