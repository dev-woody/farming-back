import { IsEmail, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly profile_img: string;

  @IsString()
  readonly user_id: string;

  @IsString()
  readonly password: string;

  @IsNumber()
  readonly zip_code: number;

  @IsString()
  readonly address: string;

  @IsString()
  readonly address_detail: string;

  @IsEmail()
  readonly email: string;

  @IsPhoneNumber("KR")
  readonly phone: string;
}
