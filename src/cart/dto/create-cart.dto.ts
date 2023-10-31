import { IsArray, IsInt, IsString } from "class-validator";

export class Cart_Option_Item {
  @IsString()
  readonly uuid: string;

  @IsString()
  readonly opt_value: string;

  @IsInt()
  readonly price: number;

  @IsInt()
  readonly sale_price: number;

  @IsInt()
  readonly quantity: number;
}

export class Cart_Option {
  @IsString()
  readonly uuid: string;

  @IsString()
  readonly opt_name: string;

  @IsArray()
  readonly option_items: Cart_Option_Item[];
}

export class CreateCartDto {
  @IsString()
  readonly user_id: string;

  @IsString()
  readonly prod_id: string;

  @IsString()
  readonly prod_img: string;

  @IsString()
  readonly prod_name: string;

  @IsArray()
  readonly options: Cart_Option[];
}
