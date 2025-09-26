import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private http = inject(HttpClient);

  getAllPosts():Observable<any>{
    return this.http.get(`${environment.baseUrl}posts?limit=50`)
  }

  
}
