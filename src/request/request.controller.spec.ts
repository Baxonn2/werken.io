import { Test, TestingModule } from '@nestjs/testing';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';

describe('MessageController', () => {
  let controller: RequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestController],
      providers: [RequestService],
    }).compile();

    controller = module.get<RequestController>(RequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of requests', () => {
    const response = controller.getRequests()
    
    expect(response).toBeInstanceOf(Array);
  })

  it('should create a request', () => {
    const response = controller.createRequest({
      url: 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        name: 'test'
      },
      method: 'POST',
      sendAt: new Date()
    })

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('url');
    expect(response).toHaveProperty('headers');
    expect(response).toHaveProperty('body');
    expect(response).toHaveProperty('method');
    expect(response).toHaveProperty('createdAt');
    expect(response).toHaveProperty('sendAt');
    expect(response).toHaveProperty('isSended');
    expect(response).toHaveProperty('sendedAt');
    expect(response).toHaveProperty('response');
  })
});
