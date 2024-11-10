import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getConfigModuleOptions } from './configs/config/config.module';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs/rmq.config';

@Module({
  imports: [ConfigModule.forRoot(getConfigModuleOptions()), RMQModule.forRootAsync(getRMQConfig())],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
