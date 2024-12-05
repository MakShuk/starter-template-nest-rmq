import { Injectable } from '@nestjs/common';
import { PuppeteerService } from 'services/puppeteer/puppeteer.service';
import { OnModuleInit } from '@nestjs/common';
import { Authorization } from 'helpers/authorization';

@Injectable()
export class RmqService implements OnModuleInit {
  authorization: Authorization | undefined;

  constructor(private readonly browser: PuppeteerService) {
  }

  async onModuleInit(): Promise<void> {
    await this.browser.initialize();
    this.authorization = new Authorization(this.browser);
  }

  async start(): Promise<void> {
    await this.browser.initialize();
    await this.browser.navigateToPage('https://300.ya.ru/');
    await this.browser.page.waitForFunction(() => document.readyState === 'complete');
    await this.authorization?.authorization();
  }
}
