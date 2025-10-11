import { Component, inject } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Auth } from '../../../core/services/auth/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [NgbDropdownModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  private auth = inject(Auth);
  currentPic:any;

  signout(){
    this.auth.signout();
  }

  ngOnInit(): void {
    this.getCurrentPic();
  }

  getCurrentPic(){
    this.auth.getUserData().subscribe({
      next:(res)=>{
        this.currentPic = res.user.photo;
      }
    })
  }
}
