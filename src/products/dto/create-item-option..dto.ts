import { IsInt, IsString } from "class-validator";

export class createItemOptionDto {
  @IsString()
  opt_value: string;

  @IsInt()
  price: number;
}
