import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../core/services/auth/auth';

@Component({
  selector: 'app-profile-pic',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-pic.html',
  styleUrl: './profile-pic.css'
})
export class ProfilePic {
  private auth = inject(Auth);
  savedFile:any;
  currentPic:any;

  ngOnInit(): void {
    this.getCurrentPic();
  }

  getCurrentPic(){
    this.auth.getUserData().subscribe({
      next:(res)=>{
        this.currentPic = res.user.photo
      }
    })
  }

  selectedFile(e:any){
    console.log(e.target.files[0]);

    if(e.target.files && e.target.files[0]){
      this.savedFile = e.target.files[0];
      this.changePicture.patchValue({photo:e.target.files[0]});
      this.changePicture.get('photo')?.updateValueAndValidity();
    }
  }

  changePicture:FormGroup = new FormGroup({
    photo: new FormControl(null,Validators.required)
  })

  sumbit(){
    if(this.changePicture.valid && this.savedFile){
      const formData = new FormData();
      formData.append('photo',this.savedFile);
      this.auth.changeProfile(formData).subscribe({
        next:(res)=>{
          this.changePicture.reset();
          this.getCurrentPic();
        }
      })
    } else {
      this.changePicture.markAllAsTouched();
    }
  }
}
