import { IsArray, IsString } from "class-validator";
import { createItemOptionDto } from "./create-item-option..dto";

export class createOptionDto {
  @IsString()
  opt_name: string;

  @IsArray()
  option_item: createItemOptionDto[];
}
