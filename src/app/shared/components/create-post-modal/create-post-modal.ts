import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from '../../../core/services/posts/posts-service';

@Component({
  selector: 'app-create-post-modal',
  imports: [FormsModule],
  templateUrl: './create-post-modal.html',
  styleUrl: './create-post-modal.css'
})
export class CreatePostModal {
  constructor(public activeModel:NgbActiveModal, private posts:PostsService){}

  postContent:string = '';
  savedFiles:any;

  selectedFile(e:any){
    console.log(e.target.files[0]);

    if(e.target.files && e.target.files[0]){
      this.savedFiles = e.target.files[0];
    }
  }

  sumbit(){
    const formData = new FormData;
    if(this.postContent){
      formData.append('body', this.postContent);
    }
    if(this.savedFiles){
      formData.append('image', this.savedFiles);
    }
    this.posts.createPost(formData).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message == 'success'){
          this.activeModel.dismiss('success')
        }
      }
    })
  }
}
