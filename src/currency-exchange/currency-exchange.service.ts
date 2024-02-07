import { Injectable, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class CurrencyExchangeService {
  async scrapeCurrencyExchange() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
      await page.goto(
        'https://nbp.pl/en/statistic-and-financial-reporting/rates/table-a/',
        {
          waitUntil: 'domcontentloaded',
        },
      );

      const data = await page.evaluate(() => {
        const title = document.querySelector(
          '.header > .container > .entry-meta',
        ).textContent;

        const currencies = document.querySelectorAll('tr');
        return Array.from(currencies).map((cells) => {
          return cells[0]
        });
      });

      await browser.close();

      return data;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Error at scraping currency exchange');
    }
  }
}
