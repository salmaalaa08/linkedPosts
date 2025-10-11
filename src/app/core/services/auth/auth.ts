import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ISignup } from '../../interfaces/auth/i-signup';
import { ISignin } from '../../interfaces/auth/i-signin';
import { CookieService } from 'ngx-cookie-service';
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient);
  private cookies = inject(CookieService);
  private route = inject(Router);

  userData:BehaviorSubject<null | JwtPayload> = new BehaviorSubject<null | JwtPayload> (null);

  constructor(@Inject(PLATFORM_ID) private id:object){
    if(this.cookies.get('token')){
      this.decodedUserData();
    }
  }

  signup(payload:ISignup):Observable<any>{
    return this.http.post(`${environment.baseUrl}users/signup`, payload)
  }

  signin(payload:ISignin):Observable<any>{
    return this.http.post(`${environment.baseUrl}users/signin`, payload)
  }

  decodedUserData(){
    const token = this.cookies.get('token');
    const decoded = jwtDecode(token!);
    this.userData.next(decoded);
  }

  signout(){
    this.cookies.delete('token');
    this.userData.next(null);
    this.route.navigate(['/signin']);
  }

  getUserData():Observable<any>{
    return this.http.get(`${environment.baseUrl}users/profile-data`)
  }

  changePassword(payload:any):Observable<any>{
    return this.http.patch(`${environment.baseUrl}users/change-password`,payload)
  }

  changeProfile(payload:FormData):Observable<any>{
    return this.http.put(`${environment.baseUrl}users/upload-photo`, payload)
  }
}
