import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (ConfigService: ConfigService) => ({
        uri: ConfigService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
