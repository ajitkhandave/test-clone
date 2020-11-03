import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'qty'
})
export class QtyPipe implements PipeTransform {

  transform(value: number, format?: any): any {
    if (value) {
      if (typeof value === 'string') {
        value = Number(value); // Have to have Number to apply locals.
      }
      return value.toLocaleString('en-US');
    }
    return null;
  }

}
