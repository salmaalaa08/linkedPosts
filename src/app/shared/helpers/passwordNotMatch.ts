import { AbstractControl } from "@angular/forms";

export const passwordNotMatch = (control:AbstractControl) => {
    return control.get('password')?.value === control.get('newPassword')?.value ? {samePassword:true} : null 
}