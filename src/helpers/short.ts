import { Page } from "puppeteer";
import { PuppeteerService } from "services/puppeteer/puppeteer.service";

export class Summary {
  page: Page;
  directoryPath = './screenshots';
  constructor(private readonly browser: PuppeteerService) {
    this.page = this.browser.page;
  }
  setContent(content: string): void {
    console.log(`Content: ${content}`);
  }
}
    