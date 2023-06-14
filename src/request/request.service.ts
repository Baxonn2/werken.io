import { Injectable } from '@nestjs/common';
import { RequestHook, RequestResponse } from './dto/request.entity';
import { CreateRequestDto } from './dto/request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { PriorityQueue } from 'src/helpers/priorityQueue';
import { Cron, CronExpression } from '@nestjs/schedule';
import { log } from 'console';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class RequestService {

    private requestsQueue: PriorityQueue<number> = new PriorityQueue<number>();

    constructor(
        private readonly httpService: HttpService,
        @InjectRepository(RequestHook) private requestHookRepository: Repository<RequestHook>,
        @InjectRepository(RequestResponse) private requestResponseRepository: Repository<RequestResponse>
    ) { 
        this.getUnsendedRequests().then(requests => {
            requests.forEach(request => {
                this.requestsQueue.enqueue(request.id, request.sendAt.getTime());
            });
        });
    }

    /**
     * @returns - All requests created
     */
    async getRequests(): Promise<RequestHook[]> {
        return await this.requestHookRepository.find();
    }

    /**
     * Returns the request with the given id
     * @param id - The id of the request
     * @returns  - The request with the given id
     */
    async getRequest(id: number): Promise<RequestHook> {
        return this.requestHookRepository.findOne({
            where: {
                id: id
            }
        });
    }

    /**
     * Returns all unsended requests
     * @returns - All unsended requests
     */
    async getUnsendedRequests(): Promise<RequestHook[]> {
        return this.requestHookRepository.find({
            where: {
                isSended: false
            }
        });
    }

    /**
     * Creates a new request
     * @param newRequest - The request to be created
     * @returns          - The created request
     */
    async createRequestMessage(newRequest: CreateRequestDto): Promise<RequestHook> {
        const newRequestMessage = this.requestHookRepository.create(newRequest);
        await this.requestHookRepository.save(newRequestMessage);

        log('sendAt', newRequestMessage.sendAt)
        const sendAt = new Date(newRequestMessage.sendAt)
        this.requestsQueue.enqueue(newRequestMessage.id, sendAt.getTime());
        
        return newRequestMessage;
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async processRequests() {
        console.log('Processing requests');
        const now = new Date();
        while (!this.requestsQueue.isEmpty() && this.requestsQueue.peek().priority <= now.getTime()) {
            const requestId = this.requestsQueue.dequeue();
            const request = await this.getRequest(requestId.item);
            this._sendRequest(request);
        }
    }

    private async _sendRequest(request: RequestHook): Promise<RequestResponse> {
        console.log('Sending request', request.id, 'at', request.sendAt, 'to', request.url);
        
        // TODO: Improve error and request method handling
        let requestResponseMessage: DeepPartial<RequestResponse>;
        try {
            const requestResponse = await lastValueFrom(
                this.httpService.get(request.url).pipe(
                    catchError(error => {
                        requestResponseMessage = {
                            receivedAt: new Date(),
                            code: 404,
                            body: error.message
                        }
                        throw `Error on sendin request. Error code: "${error.code}"`;
                    }),
                    
                )
            )

            console.log('Request', request.id, 'sent', requestResponse.status);
            
            requestResponseMessage = {
                receivedAt: new Date(),
                code: requestResponse.status,
                body: await requestResponse.data
            }
        } catch (error) {
            console.log('Request', request.id, 'failed. ', error);
        }

        const requestResponseEntity = this.requestResponseRepository.create(requestResponseMessage);
        await this.requestResponseRepository.save(requestResponseEntity);
        
        request.isSended = true;
        request.response = requestResponseEntity;
        this.requestHookRepository.save(request);

        return requestResponseEntity;
    }
        
}
