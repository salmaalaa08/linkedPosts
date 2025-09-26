import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPassword } from '../../../shared/helpers/confirmPassword/confirmPassword';
import { Auth } from '../../../core/services/auth/auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signin',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css'
})
export class Signin {

  private auth = inject(Auth);
  private route = inject(Router);
  private cookies = inject(CookieService);

  isSignUp:boolean = false;
  toggleMode() {
    this.isSignUp = !this.isSignUp;
  }

  showPassword: boolean = false;
  showRePassword: boolean = false;
  showSigninPassword: boolean = false;
  togglePassword(field: string) {
    if (field === 'password') this.showPassword = !this.showPassword;
    if (field === 'rePassword') this.showRePassword = !this.showRePassword;
    if (field === 'signinPassword') this.showSigninPassword = !this.showSigninPassword;
  }


  signinForm:FormGroup = new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  submitSignin(){
    if(this.signinForm.valid){
      // api
      this.auth.signin(this.signinForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'success'){
            this.cookies.set('token', res.token);
            this.auth.decodedUserData();
            this.route.navigate(['/timeline'])
          }
        }
      })
      // console.log(this.signinForm.value);
    } else {
      this.signinForm.markAllAsTouched();
    }
  }

  signupForm:FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email:new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    rePassword:new FormControl('', [Validators.required]),
    dateOfBirth:new FormControl('', Validators.required),
    gender:new FormControl('', Validators.required)
  }, {validators: confirmPassword})

  submitSignup(){
    if(this.signupForm.valid){
      // api
      this.auth.signup(this.signupForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'success'){
            // this.route.navigate(['/signin'])
            this.toggleMode()          }
        },
        error: (err) => {
          console.log(err)
        }
      })
      console.log(this.signupForm.value);
    } else {
      this.signupForm.markAllAsTouched();
    } 
   }

}
