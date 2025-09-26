import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/auth/auth';

@Component({
  selector: 'app-timeline',
  imports: [],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css'
})
export class Timeline {
  private auth = inject(Auth);

  signout(){
    this.auth.signout();
  }
}
