import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { RecipientsService } from './recipients.service';
import { Recipient } from './schemas/recipient.schema';

@Controller('recipients')
export class RecipientsController {
  constructor(private readonly recipientService: RecipientsService) {}

  @Get()
  getAll(): Promise<Recipient[]> {
    return this.recipientService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Recipient> {
    return this.recipientService.getOne(id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createRecipientDto: CreateRecipientDto): Promise<Recipient> {
    return this.recipientService.create(createRecipientDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Recipient> {
    return this.recipientService.remove(id);
  }
  @Put(':id')
  update(
    @Body() updateRecipientDto: UpdateRecipientDto,
    @Param('id') id: string,
  ): Promise<Recipient> {
    return this.recipientService.update(id, updateRecipientDto);
  }
}
