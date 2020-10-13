import { FormGroup, ValidationErrors } from '@angular/forms';

export function FilterSelectedValidator(formGroup: FormGroup): ValidationErrors | null {
  const { controls } = formGroup;
  const isFormValid = Object.values(controls).some(control => !!control.value);
  return isFormValid ? null : { filterNotSelected: true };
}
