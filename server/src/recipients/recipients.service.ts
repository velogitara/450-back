import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';

import { Recipient, RecepientDocument } from './schemas/recipient.schema';

@Injectable()
export class RecipientsService {
  constructor(
    @InjectModel(Recipient.name)
    private recipientModel: Model<RecepientDocument>,
  ) {}

  async getAll(): Promise<Recipient[]> {
    return this.recipientModel.find().exec();
  }
  async getOne(id: string): Promise<Recipient> {
    return this.recipientModel.findById(id);
  }
  async create(recipientDto: CreateRecipientDto): Promise<Recipient> {
    const newRecipient = new this.recipientModel(recipientDto);
    return newRecipient.save();
  }
  async remove(id: string): Promise<Recipient> {
    return this.recipientModel.findByIdAndRemove(id);
  }
  async update(
    id: string,
    recipientDto: UpdateRecipientDto,
  ): Promise<Recipient> {
    return this.recipientModel.findByIdAndUpdate(id, recipientDto, {
      new: true,
    });
  }
}
