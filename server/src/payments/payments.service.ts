/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import Razorpay from 'razorpay';
import shortid from 'shortid';
import { Payment } from './payments.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';

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
 apiKey = this.configService.get<string>('RAZORPAY_API_KEY');
apiSecret = this.configService.get<string>('RAZORPAY_APT_SECRET');
  async createOrder(amount: number, currency: string): Promise<any> {
    try {
      const order = await this.razorpay.orders.create({
        amount: amount * 100, 
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
 
  // get payments details
  async getPaymentDetails(paymentId: string) {
    try {
      const response = await axios.get(`https://api.razorpay.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${this.apiKey}:${this.apiSecret}`).toString('base64')}`,
        },
      });
  
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching payment details: ${error.message}`);
    }
  }
  async verifyPayment(paymentDetails: any) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      paymentDetails;
     const check=await this.getPaymentDetails(razorpay_payment_id)
    //  console.log("check",check)
    if(check.status=="captured"){
      
    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        'sha256',
        this.configService.get<string>('RAZORPAY_APT_SECRET'),
      )
      .update(body)
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
      // Payment verification successful
      await this.PaymentModel.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        payment_method:check.method,
        amount:check.amount+check.currency
      });
      this.transferRoute(check.id,check.notes,check.amount)
      return { success: true };
    }
    } else {
      return { success: false, error: 'Invalid signature' };
    }
  }
   // send basic auth from razorpay
   async transferRoute(paymentID: string, transferData: any, amount: number): Promise<void> {
    try {
      const requestBody = {
        transfers: [
          {
            account: transferData.acc_id,
            amount: amount,
            currency: "INR",
            notes: {
              name: transferData.name,
              roll_no: "IEC2011025"
            },
            // linked_account_notes: [
            //   "name": "Gaurav Kumar",
            //   "roll_no": "IEC2011025"
            // ],
            on_hold: false,
          }
        ]
      };
  
      console.log('Request Body:', requestBody);
  
      const response = await axios.post(`https://api.razorpay.com/v1/payments/${paymentID}/transfers`, requestBody, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${this.apiKey}:${this.apiSecret}`).toString('base64')}`,
          'Content-Type': 'application/json'
        },
      });
  
      console.log('Response:', response.data);
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.error('Error Response Data:', err.response.data);
        console.error('Error Response Status:', err.response.status);
        console.error('Error Response Headers:', err.response.headers);
      } else if (err.request) {
        // The request was made but no response was received
        console.error('Error Request Data:', err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error Message:', err.message);
      }
      console.error('Config:', err.config);
      throw err;
    }
  }
  

  async getBasicAuth(): Promise<string> {
    try {
      const response = await axios.get(`https://api.razorpay.com/v1/payments/`, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${this.apiKey}:${this.apiSecret}`).toString('base64')}`,
        },
      });
  
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching payment details: ${error.message}`);
    }
  
    }
}
