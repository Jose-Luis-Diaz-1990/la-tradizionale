import { AbstractControl } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';

//Devuelvo error si se intenta grabar el formulario cuando no se está editando y no se ha seleccionado imagen. 
//En caso contrario, si se está introduciendo una nueva película sin imagen entonces devuelvo error.
export function isSelectedSize():ValidatorFn{
    return(control: AbstractControl) =>{        
        const isSizeOK= (control.value==="selecciona"); 
        return isSizeOK ? {
            isSizeOK:true}
            :null
        }
    }