import { Injectable } from '@angular/core';
import { Predicate } from '../interfaces';

import * as _ from 'lodash';

@Injectable()
export class ItemsService {

  constructor() { }

  getKeys(object): string[] {
    return _.keysIn(object);
  }

  reversedItems<T> (array: T[]) : T[] {
    return <T[]> _.reverse(array);
  }

  groupByBoolean (object, value: boolean): number {
    let result: number = 0;
    if (object == null) 
      return result;

    _.map(_.shuffle(object), function (val) {
      if (val === value) 
        result++
    });

    return result;
  }

  includesItem<T>(array: Array<T>, predicate: Predicate<T>) {
    let result = _.filter(array, predicate);
    return result.length > 0;
  }

  /*
    Finds a specific item in an array using a predicate and replaces it
  */
  setItem<T>(array: Array<T>, predicate: Predicate<T>, item: T) {
    var _oldItem = _.find(array, predicate);
    if (_oldItem) {
      var index = _.indexOf(array, _oldItem);
      array.splice(index, 1, item);
    } else {
      array.push(item);
    }
  }

}