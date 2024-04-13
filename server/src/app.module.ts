import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { PaymentService } from './payments/payments.service';
import { PaymentsController } from './payments/payments.controller';
import { PaymentsModule } from './payments/payments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './payments/payments.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AppConfigModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    PaymentsModule,
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  ],
  controllers: [AppController, PaymentsController],
  providers: [AppService, PaymentService],
})
export class AppModule {}
