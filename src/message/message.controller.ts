import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { RequestMessage } from './dto/message.entities';
import { CreateRequestMessageDto } from './dto/message.dto';

@Controller('message')
export class MessageController {

    constructor(
        private readonly messageService: MessageService
    ) { }

    @Get()
    getMessages(): RequestMessage[] {
        return this.messageService.getMessages();
    }

    @Post()
    createMessage(@Body() newRequestMessage: CreateRequestMessageDto): RequestMessage {
        return this.messageService.createRequestMessage(newRequestMessage);
    }
}
