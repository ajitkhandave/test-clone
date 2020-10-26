import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'qty'
})
export class QtyPipe implements PipeTransform {

  transform(value: number, format?: any): any {
    if (value) {
      return value.toLocaleString('en-US');
    }
    return null;
  }

}
