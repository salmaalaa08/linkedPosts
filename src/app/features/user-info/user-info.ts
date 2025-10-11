import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/auth/auth';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-info',
  imports: [DatePipe],
  templateUrl: './user-info.html',
  styleUrl: './user-info.css'
})
export class UserInfo {
  private auth = inject(Auth);

  userData:any;

  ngOnInit(): void {
    this.auth.getUserData().subscribe({
      next:(res)=>{
        console.log(res.user);
        this.userData = res.user;
      }      
    })
  }
}
