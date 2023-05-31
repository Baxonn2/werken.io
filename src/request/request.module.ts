import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestHook, RequestResponse } from './dto/request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestHook, RequestResponse])],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
