import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms'
@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  /**
   * Should't be only whitespace
   */
  public noWhitespaceValidator = (control: AbstractControl) => {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  };

  /**
   * Passwords may not contain the letters i, o, or l as these letters can be mistaken for other characters 
   */
  public noForbiddenLetters = (control: AbstractControl) => {
    const index = control.value.search(/[o|i|l]/g);
    const isValid = index === -1;
    return isValid ? null : { 'forbiddenLetters': true };
  };

  /**
   * No non-overlapping pairs of letters
   */
  public noDoubleLetters = (control: AbstractControl) => {
    const index = control.value.search(/(.)\1+/g);
    const isValid = index === -1;
    return isValid ? null : { 'doubleLetters': true };
  };

  public matchValidator = (group: FormGroup) => {
    const values = [];
    for (let name in group.controls) {
      values.push(group.controls[name].value);
    }
    const isValid = this.hasDublicates(values);
    return isValid ? null : { 'mismatch': true };
  };
  /**
   *  Must include one increasing straight of at least three letters, like ‘abc’, ‘cde’, ‘fgh’, and so on, up to ‘xyz’.
   */
  public shouldBeStraightLetters = (control: AbstractControl) => {
    const characters = control.value.toLowerCase().split("");
    if (characters.length < 3) {
      return { 'doubleLetters': true };
    }
    let counter = 0;
    for (let i = 0; i < characters.length; i++) {
      if (this.nextChar(characters[i]) === characters[i + 1]) {
        counter++;
        if (counter > 1) {
          return null;
          break;
        }
      } else {
        counter = 0;
      }
    }
    return { 'doubleLetters': true };
  };

   /**
   * use parseInt with radix 36 (alphabit) and the opposite method Number#toString with the same radix, and a correction for the value.
   */
  private nextChar(c: string) {
    if (c === 'z') {
      return '-1';
    }
    const i = (parseInt(c, 36) + 1 ) % 36;
    return (Number(!i) * 10 + i).toString(36);
  };

  /**
   * Will detect dublicates in array of string values, O(n)
   * @param array<strng>
   */
  private hasDublicates(array: Array<string>) {
    const valueSoFar = Object.create(null);
    for (let i = 0; i < array.length; i ++) {
      const value = array[i];
      if (value in valueSoFar) {
        return true;
      }
      valueSoFar[value] = true;
    }
    return false;
  };
}
