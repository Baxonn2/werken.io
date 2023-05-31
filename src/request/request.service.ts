import { Injectable } from '@nestjs/common';
import { RequestHook } from './dto/request.entity';
import { CreateRequestDto } from './dto/request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RequestService {

    constructor(
        @InjectRepository(RequestHook) private requestHookRepository: Repository<RequestHook>
    ) { }

    async getRequests(): Promise<RequestHook[]> {
        return await this.requestHookRepository.find();
    }

    createRequestMessage(newRequest: CreateRequestDto): RequestHook {
        const newRequestMessage = this.requestHookRepository.create(newRequest);
        this.requestHookRepository.save(newRequestMessage);
        
        return newRequestMessage;
    }        
}
