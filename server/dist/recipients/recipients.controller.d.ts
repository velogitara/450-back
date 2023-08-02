import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { RecipientsService } from './recipients.service';
import { Recipient } from './schemas/recipient.schema';
export declare class RecipientsController {
    private readonly recipientService;
    constructor(recipientService: RecipientsService);
    getAll(): Promise<Recipient[]>;
    getOne(id: string): Promise<Recipient>;
    create(createRecipientDto: CreateRecipientDto): Promise<Recipient>;
    remove(id: string): Promise<Recipient>;
    update(updateRecipientDto: UpdateRecipientDto, id: string): Promise<Recipient>;
}
