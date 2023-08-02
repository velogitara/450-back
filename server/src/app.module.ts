import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipientsModule } from './recipients/recipients.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_HOST'),
      }),
      inject: [ConfigService],
    }),
    RecipientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
