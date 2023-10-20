import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TossPaymentDto {
  @IsNotEmpty()
  @IsString()
  readonly paymentKey: string;

  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
