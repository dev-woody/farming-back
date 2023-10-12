import { IsArray, IsNumber, IsString } from "class-validator";
import { Option } from "../entities/option.entity";

export class CreateProductDto {
  @IsString()
  readonly prd_name: string;

  @IsString()
  readonly category: string;

  @IsNumber()
  readonly price: number;

  @IsNumber()
  readonly sale_price: number;

  @IsString()
  readonly description: string;

  @IsString()
  readonly thumbnail: string;

  @IsString()
  readonly detail_page: string;

  @IsArray()
  readonly options: Option[];
}
