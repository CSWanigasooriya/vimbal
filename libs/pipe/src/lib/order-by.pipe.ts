import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null
  }
}
