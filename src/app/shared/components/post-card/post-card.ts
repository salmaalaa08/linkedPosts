import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, WritableSignal, inject, signal } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommentsService } from '../../../core/services/comments/comments-service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-post-card',
  imports: [NgbDropdownModule, DatePipe, CommonModule, FormsModule],
  templateUrl: './post-card.html',
  styleUrl: './post-card.css'
})
export class PostCard {
  @Input() postItem!:any;

  private comments = inject(CommentsService);

  commentsList:WritableSignal<any[]> = signal([]);
  commentsNumber:WritableSignal<number> = signal(0);
  showAll:boolean = false;
  commentContent:string = '';

  getComments(postId:string){
    this.comments.getPostComments(postId).subscribe({
      next: (res) => {
        this.commentsList.set(res.comments);
        this.commentsNumber.set(res.total);
      }
    })
  }

  ngOnInit(): void {
    this.getComments(this.postItem._id);
  }

  toggleShowAll(){
    this.showAll = !this.showAll;
  }

  addComment(postId:string){
    if(!this.commentContent.trim()) return;

    this.comments.createComment({
      content: this.commentContent,
      post: postId
    }).subscribe({
      next: (res) => {
        this.getComments(postId);
        this.commentContent = '';
      }
    })
  }
}
