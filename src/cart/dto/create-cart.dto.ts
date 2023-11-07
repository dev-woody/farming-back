import { IsArray, IsInt, IsString } from "class-validator";

export class Cart_OptDto {
  @IsString()
  readonly uuid: string;

  @IsInt()
  readonly quantity: number;
}

export class Cart_ItemDto {
  @IsString()
  readonly uuid: string;

  @IsArray()
  readonly options: Cart_OptDto[];
}

export class CreateCartDto {
  @IsString()
  readonly user: string;

  @IsString()
  readonly product: string;

  @IsArray()
  readonly items: Cart_ItemDto[];
}
