import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { RMQRoute } from 'nestjs-rmq';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @RMQRoute(`mak.test`)
  async test() {
    console.log('test');
    return this.appService.getHello();
  }
}
