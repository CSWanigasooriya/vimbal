import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitBy',
})
export class SplitByPipe implements PipeTransform {
  transform(value?: string, symbol?: string): string[] {
    return value ? value.split(symbol ? symbol : '') : [];
  }
}
