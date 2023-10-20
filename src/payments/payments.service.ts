import { Injectable } from "@nestjs/common";
import { TossPaymentDto } from "./dto/toss-payment.dto";
import axios from "axios";
@Injectable()
export class PaymentsService {
  tossUrl = "https://api.tosspayments.com/v1/payments/";
  async successPay(tossPaymentDto: TossPaymentDto) {
    const { orderId, amount, paymentKey } = tossPaymentDto;
    try {
      const pay = await axios.post(
        this.tossUrl + paymentKey,
        {
          orderId: orderId,
          amount: amount,
        },
        {
          headers: {
            Authorization:
              "Basic " +
              Buffer.from(process.env.TOSS_TEST_KEY + ":").toString("base64"),
            "Content-Type": "application/json",
          },
        },
      );
      console.log("pay", pay);
      return {
        title: "성공적으로 구매했습니다",
        // amount: response.body.totalAmount,
      };
    } catch (e) {
      console.log("토스 페이먼츠 에러 코드", e);
    }
  }

  findAll() {
    return `This action returns all payments`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
