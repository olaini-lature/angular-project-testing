import { Injectable } from "@angular/core";
import { trim } from "lodash";

let isEqual = function (value, other) {

  // Get the value type
  let type = Object.prototype.toString.call(value);

  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) return false;

  // If items are not an object or array or string, return false
  if (['[object Array]', '[object Object]', '[object String]', '[object Boolean]', '[object Number]'].indexOf(type) < 0) return false;

  // Compare the length of the length of the two items
  let valueLen = -1;
  let otherLen = -1;

  if (type === '[object Array]') {
    valueLen = value.length;
    otherLen = other.length;
  } else if (type === '[object Object]') {
    valueLen = Object.keys(value).length;
    otherLen = Object.keys(other).length;
  } else {
    if (value === other) {
      return true;
    } else {
      return false;
    }
  }

  if (valueLen !== otherLen) return false;

  // Compare two items
  let compare = function (item1, item2) {

    // Get the object type
    let itemType = Object.prototype.toString.call(item1);

    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) return false;
    }

    // Otherwise, do a simple comparison
    else {

      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) return false;

      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) return false;
      } else {
        if (item1 !== item2) return false;
      }

    }
  };

  // Compare properties
  if (type === '[object Array]') {
    for (var i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) return false;
    }
  } else {
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false;
      }
    }
  }

  // If nothing failed, return true
  return true;

};
@Injectable({
  providedIn: "root",
})
export class UtilityService {

  constructor() { }

  convertKbToMb(size: number) {
    return size / 1000 + ' MB';
  }

  onlyNumber(event) {
    return new Promise<any>((resolve) => {
      let charCode = event.which ? event.which : event.keyCode;
      if (charCode >= 48 && charCode <= 57) {
        // number
        resolve(true);
        return;
      } else if (charCode >= 37 && charCode <= 40) {
        // arrow
        resolve(true);
        return;
      } else if (charCode === 8 || charCode === 46) {
        resolve(true);
        return;
      } else {
        event.preventDefault();
        resolve(false);
      }
    });
  }

  preventSpace(event) {
    return new Promise<any>((resolve) => {
      let charCode = event.which ? event.which : event.keyCode;
      if (charCode !== 32) { // space
        // number
        resolve(true);
        return;
      } else {
        event.preventDefault();
        resolve(false);
      }
    });
  }

  preventEnter(event) {
    return new Promise<any>((resolve) => {
      let charCode = event.which ? event.which : event.keyCode;
      if (charCode !== 13) { // enter
        resolve(true);
        return;
      } else {
        event.preventDefault();
        resolve(false);
      }
    });
  }

  removeZeroLeading(event) {
    return new Promise<any>((resolve) => {

      if (event.target.value.length > 0) {
        this.removeSurroundingSpace(event).then((resEvent) => {
          resEvent.target.value = parseInt(resEvent.target.value, 10);
          resolve(resEvent);
        });
      } else {
        resolve(event);
      }

    });
  }

  removeSurroundingSpace(event) {
    return new Promise<any>((resolve) => {
      event.target.value = trim(event.target.value);
      resolve(event);
    });
  }

  capitalize(value: string): string {
    let arrWords = value.split(' ');
    let arrCapitalize = [];

    const prepositionsEn = ['in', 'at', 'on', 'upon', 'to', 'for', 'of', 'by', 'and', 'which', 'that'];
    const prepositionsId = ['di', 'ke', 'dari', 'dan', 'yang', 'untuk'];

    for (let word of arrWords) {
      word = word.toLowerCase();
      const existEn = prepositionsEn.includes(word);
      const existId = prepositionsId.includes(word);

      if (existEn || existId) {
        arrCapitalize.push(word);
      } else {
        let firstChar = word.charAt(0);
        firstChar = firstChar.toUpperCase();
        word = firstChar + word.substr(1);
        arrCapitalize.push(word);
      }

    }

    return arrCapitalize.join(' ');
  }

  titlecase(value: string): string {
    let arrWords = value.split(' ');
    let arrCapitalize = [];

    for (let word of arrWords) {
      word = word.toLowerCase();
      let firstChar = word.charAt(0);
      firstChar = firstChar.toUpperCase();
      word = firstChar + word.substr(1);
      arrCapitalize.push(word);
    }

    return arrCapitalize.join(' ');
  }

  

  sort(array = Array(), param, order: 'asc' | 'desc') {
    if (order === 'asc') {
      return array.sort(this.compareValues(param));
    } else {
      return array.sort(this.compareValues(param, 'desc'));
    }
  }

  private compareValues(key, order = 'asc') {
    return (a, b) => {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  isEqual(object1, object2) {
    return isEqual(object1, object2);
  }

  getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }
}
