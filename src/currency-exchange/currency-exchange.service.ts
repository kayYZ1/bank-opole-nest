import { Injectable, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class CurrencyExchangeService {
  async scrapeCurrencyExchange() {
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on('request', (request) => {
      if (
        ['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    try {
      await page.goto(
        'https://nbp.pl/en/statistic-and-financial-reporting/rates/table-a/',
        {
          waitUntil: 'domcontentloaded',
        },
      );

      const data = await page.evaluate(() => {
        const title = document
          .querySelector('.header > .container > .entry-meta')
          .textContent.trim();

        const currencies = document.querySelectorAll('table > tbody > tr');
        const currencyData = [];
        const toScrape = ['Euro', 'US Dollar', 'Pound Sterling'];

        currencies.forEach((row) => {
          const cells = row.querySelectorAll('td');

          const currencyName = cells[0].textContent.trim();
          if (toScrape.includes(currencyName)) {
            const currencyCode = cells[1].textContent.trim();
            const currencyRate = cells[2].textContent.trim();

            currencyData.push({
              name: currencyName,
              code: currencyCode,
              rate: currencyRate,
            });
          }
        });

        return { title, currencyData };
      });

      //ToDO: Think about improving performance (currentl 9-10 seconds)

      await browser.close();

      return data;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Error at scraping currency exchange');
    }
  }
}
