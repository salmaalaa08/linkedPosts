import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private http = inject(HttpClient);

  getPostComments(postId:string):Observable<any>{
    return this.http.get(`${environment.baseUrl}posts/${postId}/comments`);
  }

  createComment(payload:any):Observable<any>{
    return this.http.post(`${environment.baseUrl}comments`, payload);
  }

  updateComment(commentId:string, payload:any):Observable<any>{
    return this.http.put(`${environment.baseUrl}comments/${commentId}`, payload);
  }

  deleteComment(commentId:string):Observable<any>{
    return this.http.delete(`${environment.baseUrl}comments/${commentId}`);
  }
}
