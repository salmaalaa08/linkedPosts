import { Component, WritableSignal, inject, signal } from '@angular/core';
import { PostCard } from '../../shared/components/post-card/post-card';
import { PostsService } from '../../core/services/posts/posts-service';
import { SinglePost } from "../single-post/single-post";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePostModal } from '../../shared/components/create-post-modal/create-post-modal';

@Component({
  selector: 'app-timeline',
  imports: [PostCard, SinglePost],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css'
})
export class Timeline {
  private posts = inject(PostsService);
  private modalService = inject(NgbModal);

  postsList:WritableSignal<any[]> = signal([]);
  selectedPost:any = null;

  getAllPosts(){
    this.posts.getAllPosts().subscribe({
      next: (res) => {
        // console.log(res);
        this.postsList.set(res.posts)
        console.log(this.postsList())
      }
    })
  }

  ngOnInit(): void {
    this.getAllPosts()
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
        this.getAllPosts()
      }
    }
  );
  }
}
