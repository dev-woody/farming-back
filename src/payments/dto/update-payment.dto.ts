import { PartialType } from "@nestjs/mapped-types";
import { TossPaymentDto } from "./toss-payment.dto";

export class UpdatePaymentDto extends PartialType(TossPaymentDto) {}
