import { IsBoolean, IsInt, IsString } from "class-validator";

export class createOptionDto {
  @IsString()
  name: string;

  @IsInt()
  price: number;

  @IsInt()
  salse: number;

  @IsBoolean()
  unavailable: boolean;
}
