import { IsString } from "class-validator";

export class CreateUploadDto {
  @IsString()
  readonly kind: string;
}
