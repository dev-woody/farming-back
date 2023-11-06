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

  @IsArray()
  readonly options: Option[];
}
