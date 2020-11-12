import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commonCurrency'
})
export class CommonCurrencyPipe implements PipeTransform {

  currencyPipe: CurrencyPipe = new CurrencyPipe('en-US');

  transform(value: any, args?: any): any {
    return this.currencyPipe.transform((value || 0), 'USD', 'symbol', '1.3-3');
  }

}
