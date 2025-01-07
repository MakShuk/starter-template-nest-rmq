import { Module } from '@nestjs/common';
import { TradeStatusController } from './controllers/trade-status/trade-status.controller';
import { ConfigModule } from '@nestjs/config';
import { getConfigModuleOptions } from './configs/config/config.module';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs/rmq.config';
import { CronController } from './controllers/cron/cron.controller';

@Module({
  imports: [ConfigModule.forRoot(getConfigModuleOptions()), RMQModule.forRootAsync(getRMQConfig())],
  controllers: [TradeStatusController, CronController],
  providers: [],
})
export class AppModule {}
