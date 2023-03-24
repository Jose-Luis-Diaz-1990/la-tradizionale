import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { IUser } from 'src/app/core/services/auth/models/auth.models';
import { isValidCity } from './validators/isValidCity';
import { comparePassword } from './validators/comparePassword';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public BYDEFAULTCITY="-- Selecciona una ciudad--"; 
  public registerForm?:FormGroup;
  public error:string="";
  public cities=["Madrid", "Barcelona"];
  public pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}"

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      surnames: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      postacode: new FormControl('', [Validators.required]),
      city:new FormControl(this.BYDEFAULTCITY, [isValidCity()]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
      passwordRepeat: new FormControl('', [Validators.required])
    },
    {
      // Validación custom de password
      validator: comparePassword('password', 'passwordRepeat')
    });  
    
  }

 public register(){   
  if (!this.registerForm?.valid) { return; }
  const user: IUser = this.registerForm.value;
  this.auth.register(user).subscribe({
    next: (res) => {
      this.registerForm?.reset();
      this.auth.login(user).subscribe({
        next: (res) => {
          this.registerForm?.reset();
          alert("Se han introducido correctamente los datos");
          this.router.navigate(['home']);
        },})        
    },
    error: (err) => {
      if (err.status=500)
      {
        this.error="¿Te habías registrado antes? Parece que ya existe un usuario con ese email"
      }
      else{
           this.error = err.error}
      this.registerForm?.reset();        
    },
  });
 }

 
}

