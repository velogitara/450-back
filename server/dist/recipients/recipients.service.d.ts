import { Model } from 'mongoose';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { Recipient, RecepientDocument } from './schemas/recipient.schema';
export declare class RecipientsService {
    private recipientModel;
    constructor(recipientModel: Model<RecepientDocument>);
    getAll(): Promise<Recipient[]>;
    getOne(id: string): Promise<Recipient>;
    create(recipientDto: CreateRecipientDto): Promise<Recipient>;
    remove(id: string): Promise<Recipient>;
    update(id: string, recipientDto: UpdateRecipientDto): Promise<Recipient>;
}
