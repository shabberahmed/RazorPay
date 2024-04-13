import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Payment extends Document {
  @Prop({ required: true })
  razorpay_order_id: string;

  @Prop({ required: true })
  razorpay_payment_id: string;

  @Prop({ required: true })
  razorpay_signature: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
