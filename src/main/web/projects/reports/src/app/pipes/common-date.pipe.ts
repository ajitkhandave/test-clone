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
    return moment(valueA).unix() > moment(valueB).unix() ? 1 : -1;
  }

}
