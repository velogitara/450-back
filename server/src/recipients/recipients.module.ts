import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecipientsService } from './recipients.service';
import { RecipientsController } from './recipients.controller';
import { Recipient, RecipientSchema } from './schemas/recipient.schema';

@Module({
  providers: [RecipientsService],
  controllers: [RecipientsController],
  imports: [
    MongooseModule.forFeature([
      { name: Recipient.name, schema: RecipientSchema },
    ]),
  ],
})
export class RecipientsModule {}
