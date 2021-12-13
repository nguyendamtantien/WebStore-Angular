import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class MinMaxValidators {

	min(control: AbstractControl, value: number): { [key: string]: boolean } {
		return control.value >= value ? null : { 'min': true };
	}

	max(control: AbstractControl, value: number): { [key: string]: boolean } {
		return control.value <= value ? null : { 'max': true };
	}

}
