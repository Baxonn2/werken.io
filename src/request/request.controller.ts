import { Body, Controller, Get, Post } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestHook } from './dto/request';
import { CreateRequestDto } from './dto/request.dto';

@Controller('request')
export class RequestController {

    constructor(
        private readonly requestService: RequestService
    ) { }

    @Get()
    getRequests(): RequestHook[] {
        return this.requestService.getMessages();
    }

    @Post()
    createRequest(@Body() newRequest: CreateRequestDto): RequestHook {
        return this.requestService.createRequestMessage(newRequest);
    }
}
