import { Component, WritableSignal, inject, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from '../../core/services/posts/posts-service';
import { CreatePostModal } from '../../shared/components/create-post-modal/create-post-modal';
import { PostCard } from '../../shared/components/post-card/post-card';
import { SinglePost } from '../single-post/single-post';
import { Auth } from '../../core/services/auth/auth';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user-posts',
  imports: [PostCard, SinglePost],
  templateUrl: './user-posts.html',
  styleUrl: './user-posts.css'
})
export class UserPosts {
  private posts = inject(PostsService);
  private modalService = inject(NgbModal);
  private auth = inject(Auth);

  postsList:WritableSignal<any[]> = signal([]);
  selectedPost:any = null;
  userId!:string;

  ngOnInit(): void {
    // this.auth.getUserData().subscribe({
    //   next:(res)=>{
    //     this.userId = res.user._id;
    //     console.log(this.userId);
    //     this.getUserPosts();
    //   }
    // })
    this.auth.getUserData().pipe(
      switchMap((res)=>{
        this.userId = res.user._id;
        console.log(this.userId);
        return this.posts.getUserPosts(this.userId);
      })
    ).subscribe({
      next:(res)=>{
        this.postsList.set(res.posts);
        console.log(this.postsList())
      }
    })
  }

  getUserPosts(){
    this.posts.getUserPosts(this.userId).subscribe({
      next: (res) => {
        // console.log(res);
        this.postsList.set(res.posts)
        // console.log(this.postsList())
      }
    })
  }

  showSinglePost(post:any){
    this.selectedPost = post;
  }

  closeSinglePost(){
    this.selectedPost = null;
  }

  openModal(){
    this.modalService.open(CreatePostModal).result.then(
    (result) => {
      console.log(result);
    }, 
    (reason) => {
      if(reason == 'success'){
        this.getUserPosts()
      }
    }
  );
  }
}
