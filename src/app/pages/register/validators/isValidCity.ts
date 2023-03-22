import { AbstractControl, ValidatorFn } from "@angular/forms";

const BYDEFAULTCITY="-- Selecciona una ciudad--"; 

export function isValidCity(): ValidatorFn {
    return (control:AbstractControl) => {
        const isSelected=control.value ===BYDEFAULTCITY;
        return isSelected ?
               {isSelected:true}:
               null
            }
}