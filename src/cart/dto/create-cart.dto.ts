import { IsArray, IsInt, IsString } from "class-validator";

export class Cart_Option_ValsDto {
  @IsString()
  readonly uuid: string;

  @IsString()
  readonly opt_value: string;

  @IsInt()
  readonly price: number;

  @IsInt()
  readonly quantity: number;
}

export class Cart_OptionDto {
  @IsString()
  readonly uuid: string;

  @IsString()
  readonly opt_name: string;

  @IsArray()
  readonly option_items: Cart_Option_ValsDto[];
}

export class CreateCartDto {
  @IsString()
  readonly user_uuid: string;

  @IsArray()
  readonly options: Cart_OptionDto[];
}
