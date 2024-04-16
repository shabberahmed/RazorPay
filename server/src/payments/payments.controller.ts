import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { PaymentService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post()
  async checkout(@Body() body: any) {
    const { amount, currency } = body;
    const order = await this.paymentService.createOrder(amount, currency);
    return {
      success: true,
      order,
    };
  }
  // 
  @Get(':paymentId')
  async getPaymentDetails(@Param('paymentId') paymentId: string) {
    return this.paymentService.getPaymentDetails(paymentId);
  }
  @Post('verify')
  async verifyPayment(
    @Body() paymentDetails: any,
    @Res() res: any,
  ): Promise<any> {
    try {
      const verificationResult =
        await this.paymentService.verifyPayment(paymentDetails);
      console.log(verificationResult, 'payment details');
      if (verificationResult.success) {
        console.log("checking status",verificationResult)
        return res.redirect(
          `http://localhost:4200/payment-success?reference=${paymentDetails.razorpay_payment_id}`,
        );
      } else {
        throw new HttpException(
          verificationResult.error,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      console.error('Failed to verify payment:', error);
      throw new HttpException(
        'Failed to verify payment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
