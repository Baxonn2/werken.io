import { Injectable } from '@nestjs/common';
import { RequestMessage } from './dto/message.entities';
import { CreateRequestMessageDto } from './dto/message.dto';

@Injectable()
export class MessageService {

    messages: RequestMessage[] = [];

    constructor() { }

    getMessages(): RequestMessage[] {
        return this.messages;
    }

    createRequestMessage(newRequest: CreateRequestMessageDto): RequestMessage {
        const newRequestMessage: RequestMessage = {
            id: Math.random().toString(36).substr(2, 9),
            url: newRequest.url,
            headers: newRequest.headers,
            body: newRequest.body,
            method: newRequest.method,
            createdAt: new Date(),
            sendAt: newRequest.sendAt,
            isSended: false,
            sendedAt: null,
            response: null
        };
        this.messages.push(newRequestMessage);
        return newRequestMessage;
    }        
}
