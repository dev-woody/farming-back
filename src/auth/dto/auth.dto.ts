import {
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
} from "class-validator";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AuthDTO {
  export class SignUp {
    @IsString()
    user_id: string;

    @IsString()
    @Length(4, 20)
    password: string;

    @IsString()
    name: string;

    @IsNumber()
    readonly zip_code: number;

    @IsString()
    readonly address: string;

    @IsEmail()
    readonly email: string;

    @IsPhoneNumber("KR")
    readonly phone: string;
  }

  export class SignIn {
    @IsString()
    user_id: string;

    @IsString()
    @Length(4, 20)
    password: string;
  }
}
