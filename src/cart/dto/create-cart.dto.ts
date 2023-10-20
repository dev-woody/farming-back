import { IsInt, IsString } from "class-validator";

export class CreateCartDto {
  @IsString()
  readonly user_id: string;

  @IsString()
  readonly prod_id: string;

  @IsString()
  readonly option_id: string;

  @IsInt()
  readonly quantity: number;

  @IsString()
  readonly status: string;
}
