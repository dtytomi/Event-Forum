import { FormControl } from '@angular/forms';

interface ValidationResult {
  [key: string]: boolean;
}

export class EmailValidator {
  
  public static isValid(control: FormControl): ValidationResult {
    var emailReg = /^(([^<>()\[\]\\.,;\s@"]"))
  } 
}