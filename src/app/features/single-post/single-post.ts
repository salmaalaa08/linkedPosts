import { Component, Input, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../../core/services/comments/comments-service';
import { Auth } from '../../core/services/auth/auth';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-single-post',
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  templateUrl: './single-post.html',
  styleUrl: './single-post.css'
})
export class SinglePost {
  @Input() post:any;

  private comments = inject(CommentsService);
  private auth = inject(Auth);

  commentsList:WritableSignal<any[]> = signal([]);
  commentsNumber:WritableSignal<number> = signal(0);
  commentContent:string = '';
  userId:any;
  editingCommentId:string | null = null;
  editingCommentContent:string = '';
  originalCommentContent:string = '';

  ngOnInit(): void {
   this.getComments(this.post._id);
   this.auth.getUserData().subscribe({
    next: (res) => {
      this.userId = res.user._id;
    }
   })
  }

  getComments(postId:string){
    this.comments.getPostComments(postId).subscribe({
      next: (res) => {
        this.commentsList.set(res.comments);
        this.commentsNumber.set(res.total);
      }
    })
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

  isCommentOwner(comment:any){
    return this.userId === comment.commentCreator._id;
  }

  startEditing(comment:any){
    this.editingCommentId = comment._id;
    this.editingCommentContent = comment.content;
    this.originalCommentContent = comment.content;
  }

  cancelEditing(){
    this.editingCommentId = null
    this.editingCommentContent = '';
    this.originalCommentContent = '';
  }

  updateComment(commentId:string){
    if(!this.editingCommentContent.trim()) return;

    this.comments.updateComment(commentId, {
      content: this.editingCommentContent
    }).subscribe({
      next: (res) => {
        this.getComments(this.post._id);
        this.cancelEditing()
      }
    })
  }

  isEdited():boolean{
    return this.editingCommentContent !== this.originalCommentContent;
  }
}
