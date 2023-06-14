import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestHook, RequestResponse } from './dto/request.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([RequestHook, RequestResponse])
  ],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
