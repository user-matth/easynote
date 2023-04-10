
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseApiUrl = `${environment.api}/auth/v1/user`

  getToken(): any {
    return localStorage.getItem('token');
  }

  getCurrentUser(){
    let token = localStorage.getItem('token')
    debugger
    return this.getDecodedAccessToken(token!)
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  get isLoggedIn(): boolean {
    let authToken = this.getToken();
    return authToken !== null ? true : false;
  }
}
