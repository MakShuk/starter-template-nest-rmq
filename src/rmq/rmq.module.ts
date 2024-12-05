import { Module } from '@nestjs/common';
import { RmqService } from './rmq.service';
import { RmqController } from './rmq.controller';
import { LoggerService } from '@verdaccio/logging';
import { PuppeteerService } from 'services/puppeteer/puppeteer.service';


const RmqLogger = {
  provide: LoggerService,
  useValue: new LoggerService('RMQ', 'green', { minLevel: 'info' }),
};

@Module({
  controllers: [RmqController],
  providers: [RmqService, RmqLogger, PuppeteerService],
})
export class RmqModule {}
