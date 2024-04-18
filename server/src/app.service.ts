/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getKey(): number {
    return this.configService.get<number>('RAZORPAY_API_KEY');
  }
  getSecretKey(): string {
    return this.configService.get<string>('RAZORPAY_APT_SECRET');
  }
}
