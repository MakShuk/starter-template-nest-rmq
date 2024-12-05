import { Body, Controller } from '@nestjs/common';
import { RmqService } from './rmq.service';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { SummaryCreate } from 'contracts/summary.create';
import { LoggerService } from '@verdaccio/logging';

@Controller()
export class RmqController {
  constructor(
    readonly rmqService: RmqService,
    readonly logger: LoggerService,
  ) {}

  @RMQValidate()
  @RMQRoute(SummaryCreate.topic)
  async summary(@Body() massageDto: SummaryCreate.Request): Promise<SummaryCreate.Response> {
    this.logger.setPrefix(`summary`);
    const timer = this.logger.startTimer('Загрузка данных');
    await this.rmqService.start();
    timer();
    return {
      summary: massageDto.originalText,
      messageId: massageDto.messageId,
    };
  }
}
