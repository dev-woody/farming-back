import { Controller, Post, Body, Param, Delete } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { TossPaymentDto } from "./dto/toss-payment.dto";
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("/success")
  successPay(@Body() tossPaymentDto: TossPaymentDto) {
    console.log(tossPaymentDto);
    return this.paymentsService.successPay(tossPaymentDto);
  }

  // @Get("/success")
  // success(@Res() res: Response): void {
  //   res.sendFile(path.join(__dirname, "success"));
  // }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(+id);
  }
}
