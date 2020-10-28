import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'commonDate'
})
export class CommonDatePipe implements PipeTransform {

  transform(value: any, format?: any): any {
    if (value) {
      return moment(value).format(format || 'MM/DD/YY');
    }
    return null;
  }

  sort(valueA, valueB) {
    const a = moment(valueA).unix();
    const b = moment(valueB).unix();
    if (isNaN(b)) { return -1; }
    if (isNaN(a)) { return 1; }
    return a > b ? 1 : -1;
  }

}
