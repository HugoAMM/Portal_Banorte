import { LOCALE_ID, Pipe, PipeTransform, Inject } from '@angular/core';
import { formatDate } from '@angular/common';


@Pipe({
  name: 'simpleTable',
})
export class SimpleTablePipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transform(value: string, ...args: any[]): unknown {
    const pipeType = args[0];

    if (pipeType === 'date') {
      return formatDate(value, 'short', this.locale, "");
    }

    return value;
  }

}
