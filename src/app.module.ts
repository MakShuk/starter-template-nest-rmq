import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfigModuleOptions } from './configs/config/config.module';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs/rmq.config';


@Module({
  imports: [ConfigModule.forRoot(getConfigModuleOptions()), RMQModule.forRootAsync(getRMQConfig())],
  controllers: [],
  providers: [],
})
export class AppModule {}
