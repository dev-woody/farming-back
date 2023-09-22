import { IsString, Length } from "class-validator";

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
  }

  export class SignIn {
    @IsString()
    user_id: string;

    @IsString()
    @Length(4, 20)
    password: string;
  }
}
