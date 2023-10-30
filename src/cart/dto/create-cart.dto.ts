import { IsArray, IsInt, IsString } from "class-validator";

export class Option {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsInt()
  readonly price: number;

  @IsInt()
  readonly sale_price: number;

  @IsInt()
  readonly quantity: number;
}

export class CreateCartDto {
  @IsString()
  readonly user_id: string;

  @IsString()
  readonly prod_id: string;

  @IsArray()
  readonly options: Option[];

  @IsString()
  readonly status: string;
}
