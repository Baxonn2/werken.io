import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestModule } from './request/request.module';

@Module({
  imports: [RequestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
