import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/services/auth/models/auth.models';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm?: FormGroup;
  public error:string="";
 
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public login() {   
    if (!this.loginForm?.valid) { return; }
    const user: IUser = this.loginForm.value;   
    this.auth.login(user).subscribe({    
      next: (res) => {
        this.loginForm?.reset();
        alert("Te has identificado correctamente");
        this.router.navigate(['inicio']);
      },
      error: (err) => {
        if (err.status=500)
        {
          this.error="Parece que no has introducido correctamente tu usuario y clave"
        }
        else{
             this.error = err.error}
        this.loginForm?.reset();
      },
    });
   
  }

  public register(){
    debugger;
    this.router.navigate(['registro'])
  }

}

