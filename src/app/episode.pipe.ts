import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'

@Pipe({
  name: 'episode'
})
export class EpisodePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return _.sortBy(value,'name').reverse();
  }
}
