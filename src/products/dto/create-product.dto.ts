import { IsArray, IsString } from "class-validator";
import { Option } from "../entities/option.entity";

export class CreateProductDto {
  @IsString()
  readonly prod_name: string;

  @IsString()
  readonly category: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly thumbnail: string;

  @IsString()
  readonly detail_page: string;

  @IsArray()
  readonly options: Option[];
}
