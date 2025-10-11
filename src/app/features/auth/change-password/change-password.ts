import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth/auth';
import { CookieService } from 'ngx-cookie-service';
import { passwordNotMatch } from '../../../shared/helpers/passwordNotMatch';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePassword {
  private auth = inject(Auth);
  private cookies = inject(CookieService);

  changePasswordForm:FormGroup = new FormGroup({
    password: new FormControl('', Validators.required),
    newPassword: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)])
  },{validators:passwordNotMatch})

  submit(){
    if(this.changePasswordForm.valid){
      this.auth.changePassword(this.changePasswordForm.value).subscribe({
        next:(res)=>{
          if (res.message == 'success'){
            this.cookies.delete('token');
            this.cookies.set('token', res.token);
            this.auth.decodedUserData();
            this.changePasswordForm.reset();
          }
        }
      })
    } else{
      this.changePasswordForm.markAllAsTouched();
    }
  }

  showPassword: boolean = false;
  showNewPassword: boolean = false;
  togglePassword(field: string) {
    if (field === 'password') this.showPassword = !this.showPassword;
    if (field === 'newPassword') this.showNewPassword = !this.showNewPassword;
  }


}
