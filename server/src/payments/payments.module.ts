import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: 'mongodb://localhost:27017/hellos',
      }),
    }),
    PaymentsModule,
    DatabaseModule,
  ],
})
export class PaymentsModule {}
