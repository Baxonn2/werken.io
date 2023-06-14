import { Body, Controller, Get, Post } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestHook } from './dto/request.entity';
import { CreateRequestDto } from './dto/request.dto';

@Controller('request')
export class RequestController {

    constructor(
        private readonly requestService: RequestService
    ) { }

    @Get()
    async getRequests(): Promise<RequestHook[]> {
        return await this.requestService.getRequests();
    }

    @Post()
    async createRequest(@Body() newRequest: CreateRequestDto): Promise<RequestHook> {
        return await this.requestService.createRequestMessage(newRequest);
    }
}
