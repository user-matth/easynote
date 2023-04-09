import { Injectable, Injector } from '@angular/core';
import { environment } from "src/environments/environment";
import { BaseResourceService } from './base-resource.service';
import { SignInModel, SignUpModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseResourceService<SignInModel>{

  baseApiUrl = `${environment.api}/auth/${environment.version}/user/sign-in`
  constructor(protected override injector: Injector) {
    super(`${environment.api}/auth/${environment.version}/user/sign-in`, injector, SignInModel.fromJson)
  }

  signIn(body: SignInModel){
    return this.http.post(`${this.baseApiUrl}`, body)
  }

  signUp(body: SignUpModel){
    return this.http.post(`${this.baseApiUrl}`, body)
  }

}
