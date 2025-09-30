import { Component, WritableSignal, inject, signal } from '@angular/core';
import { PostCard } from '../../shared/components/post-card/post-card';
import { PostsService } from '../../core/services/posts/posts-service';

@Component({
  selector: 'app-timeline',
  imports: [PostCard],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css'
})
export class Timeline {
  private posts = inject(PostsService);

  postsList:WritableSignal<any[]> = signal([]);

  getAllPosts(){
    this.posts.getAllPosts().subscribe({
      next: (res) => {
        // console.log(res);
        this.postsList.set(res.posts)
        // console.log(this.postsList())
      }
    })
  }

  ngOnInit(): void {
    this.getAllPosts()
  }
}
