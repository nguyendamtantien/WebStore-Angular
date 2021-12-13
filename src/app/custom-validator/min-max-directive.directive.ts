import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { MinMaxValidators } from './min-max-validator';

@Directive({
  selector: '[min][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MinValidatorDirective),
    multi: true
  }]
})
export class MinValidatorDirective implements Validator {

  constructor(private validators: MinMaxValidators) { }
  @Input() min: number;

  validate(control: AbstractControl) {
    return this.validators.min(control, this.min);
  }

}


@Directive({
  selector: '[max][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MaxValidatorDirective),
    multi: true
  }]
})
export class MaxValidatorDirective implements Validator {

  constructor(private validators: MinMaxValidators) { }
  @Input() max: number;

  validate(control: AbstractControl) {
    return this.validators.max(control, this.max);
  }

}
