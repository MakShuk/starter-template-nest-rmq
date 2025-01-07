import { Controller, Get, Query } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { BrokerGetStatus } from '@makshuk/rmq-broker-contracts'
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TradeStatusOperation, TradeStatusResponses, TradeStatusQuery } from './trade-status.swagger';

@ApiTags('Торговый статус')
@Controller()
export class TradeStatusController  {
  constructor(private readonly rmqService: RMQService) {}
 
  @ApiOperation(TradeStatusOperation)
  @ApiResponse(TradeStatusResponses[200])
  @ApiResponse(TradeStatusResponses[400])
  @ApiResponse(TradeStatusResponses[500])
  @ApiQuery(TradeStatusQuery)
  @Get('trade-status')
  async getTradeStatus(@Query('figi') figi: string) {
    const result = await this.rmqService.send<
      BrokerGetStatus.Request,
      BrokerGetStatus.Response
    >(BrokerGetStatus.topic, { figi }, {});
    console.log(result);
    return result;
  }
}
