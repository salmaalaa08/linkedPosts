import { Component, inject } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Auth } from '../../../core/services/auth/auth';

@Component({
  selector: 'app-navbar',
  imports: [NgbDropdownModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  private auth = inject(Auth);

  signout(){
    this.auth.signout();
  }
}
