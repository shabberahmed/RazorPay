import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import Razorpay from 'razorpay';
import shortid from 'shortid';
import { Payment } from './payments.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PaymentService {
  private razorpay: any;
  private PaymentModel: Model<Payment>; // Define PaymentModel as a Mongoose Model

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
  ) {
    this.PaymentModel = paymentModel;
    this.razorpay = new Razorpay({
      key_id: configService.get<string>('RAZORPAY_API_KEY'),
      key_secret: configService.get<string>('RAZORPAY_APT_SECRET'),
    });
  }

  instance(): Razorpay {
    return this.razorpay;
  }
  async createOrder(amount: number, currency: string): Promise<any> {
    try {
      const order = await this.razorpay.orders.create({
        amount: amount * 100, // Amount in paise
        currency: currency,
        receipt: shortid.generate(),
        payment_capture: 1,
      });
      return order;
    } catch (error) {
      console.error('Failed to create Razorpay order:', error);
      throw new HttpException(
        'Failed to create Razorpay order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyPayment(paymentDetails: any) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      paymentDetails;

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        'sha256',
        this.configService.get<string>('RAZORPAY_APT_SECRET'),
      )
      .update(body)
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;
    console.log(isAuthentic, 'check bool');
    if (isAuthentic) {
      // Payment verification successful
      await this.PaymentModel.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      return { success: true };
    } else {
      // Invalid signature
      return { success: false, error: 'Invalid signature' };
    }
  }
}
