import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unQuot'
})
export class UnQuotPipe implements PipeTransform {

  transform(value: string, args?: any[]): string {
    if (value) {
      return value.replace(/&quot;/g,'"');
    }
    return '';
  }

}
