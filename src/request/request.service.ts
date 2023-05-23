import { Injectable } from '@nestjs/common';
import { RequestHook } from './dto/request';
import { CreateRequestDto } from './dto/request.dto';

@Injectable()
export class RequestService {

    messages: RequestHook[] = [];

    constructor() { }

    getRequests(): RequestHook[] {
        return this.messages;
    }

    createRequestMessage(newRequest: CreateRequestDto): RequestHook {
        const newRequestMessage: RequestHook = {
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
