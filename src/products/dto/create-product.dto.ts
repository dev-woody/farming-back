import { IsArray, IsNumber, IsString } from "class-validator";
import { Option } from "../entities/option.entity";

export class CreateProductDto {
  @IsString()
  readonly prod_name: string;

  @IsString()
  readonly category: string;

  @IsNumber()
  default_price: number;

  @IsString()
  readonly description: string;

  @IsString()
  readonly thumbnail: string;

  @IsString()
  readonly detail_page: string;

  @IsNumber()
  sale_rate: number;

  @IsNumber()
  given_point_rate: number;

  @IsNumber()
  shipping_fee: number;

  @IsNumber()
  free_shipping_amount: number;

  @IsArray()
  readonly options: Option[];
}
