import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, WritableSignal, inject, signal } from '@angular/core';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentsService } from '../../../core/services/comments/comments-service';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../core/services/auth/auth';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';


@Component({
  selector: 'app-post-card',
  imports: [NgbDropdownModule, DatePipe, CommonModule, FormsModule],
  templateUrl: './post-card.html',
  styleUrl: './post-card.css'
})
export class PostCard {
  @Input() postItem!:any;
  @Output() openPost = new EventEmitter<any>();

  private comments = inject(CommentsService);
  private auth = inject(Auth);
  private modal = inject(NgbModal);

  commentsList:WritableSignal<any[]> = signal([]);
  commentsNumber:WritableSignal<number> = signal(0);
  showAll:boolean = false;
  commentContent:string = '';
  userId:any;
  editingCommentId:string | null = null;
  editingCommentContent:string = '';
  originalCommentContent:string = '';

  ngOnInit(): void {
    this.getComments(this.postItem._id);
    this.auth.getUserData().subscribe({
      next: (res) => {
        // console.log('user data:',res);
        this.userId = res.user._id;
        // console.log('userData', this.userId)
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

  isCommentOwner(comment:any){
    return this.userId === comment.commentCreator._id;
  }

  startEdit(comment:any){
    this.editingCommentId = comment._id;
    this.editingCommentContent = comment.content;
    this.originalCommentContent = comment.content;
  }

  cancelEdit(){
    this.editingCommentId = null;
    this.editingCommentContent = '';
    this.originalCommentContent = '';
  }

  updateComment(commentId:string){
    if(!this.editingCommentContent.trim()) return;

    this.comments.updateComment(commentId, {
      content: this.editingCommentContent
    }).subscribe({
      next: (res) => {
        this.getComments(this.postItem._id);
        this.cancelEdit();
      }
    })
  }

  isEdited():boolean{
    return this.editingCommentContent !== this.originalCommentContent;
  }

  deleteComment(commentId:string){
    const modalRef = this.modal.open(ConfirmDialog, {centered:true});
    modalRef.componentInstance.title = 'Delete Comment';
    modalRef.componentInstance.message = 'Are you sure you want to delete this comment ?';
    modalRef.result.then((result) => {
      if(result === true) {
        this.comments.deleteComment(commentId).subscribe({
          next: (res) => {
            console.log('remove comment',res)
            this.getComments(this.postItem._id);
          }
        });
      }
    }).catch(()=>{})
    // this.comments.deleteComment(commentId).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   }
    // })
  }

  openSinglePost(){
    this.openPost.emit(this.postItem);
  }

  isPostOwner(post:any){
    return this.userId === this.postItem.user._id;
  }
}
