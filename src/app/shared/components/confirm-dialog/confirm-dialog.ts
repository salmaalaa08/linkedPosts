import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css'
})
export class ConfirmDialog {
  @Input() title:string = 'Comfirm';
  @Input() message:string = 'Are you sure you want to delete this comment ?';

  constructor(public activeModel:NgbActiveModal){}
}
