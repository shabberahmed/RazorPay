import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
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
        return res.redirect(
          `http://localhost:4200/payment-success?reference=${paymentDetails.razorpay_payment_id}`,
        );
        // return { message: 'Payment verification successful' };
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
