
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseApiUrl = `${environment.api}/auth/v1/user`

  getToken(): any {
    console.log(localStorage.getItem('token'))
    return localStorage.getItem('token');
  }

  get isLoggedIn(): boolean {
    let authToken = this.getToken();
    return authToken !== null ? true : false;
  }
}
