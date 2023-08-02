import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipientsModule } from './recipients/recipients.module';

@Module({
  imports: [
    RecipientsModule,
    MongooseModule.forRoot(
      'mongodb+srv://backendsupport:QRSbPtVzG83kzF6H@cluster0.2q7wplk.mongodb.net/450?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
