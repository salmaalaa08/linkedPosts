import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-post-card',
  imports: [NgbDropdownModule, DatePipe, CommonModule],
  templateUrl: './post-card.html',
  styleUrl: './post-card.css'
})
export class PostCard {
  @Input() postItem!:any;
}
