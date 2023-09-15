import { IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  readonly name: string;
}
