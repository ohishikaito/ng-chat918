import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'chatDate',
})
// export class ChatDatePipe implements PipeTransform {
//   transform(value: unknown, ...args: unknown[]): unknown {
//     return null;
//   }
// }
export class ChatDatePipe implements PipeTransform {
  transform(date: number): string {
    moment.locale('ja');
    return moment(date).format('LLLL');
  }
}
