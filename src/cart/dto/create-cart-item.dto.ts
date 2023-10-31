import { IsArray, IsInt, IsString } from "class-validator";

class Option {
  @IsString()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsInt()
  readonly sale_price: number;

  @IsInt()
  readonly count: number;
}

export class CreateCartListDto {
  @IsString()
  readonly user_id: string;

  @IsString()
  readonly prod_id: string;

  @IsArray()
  readonly option: Option[];

  @IsString()
  readonly status: string;
}
