import { Injectable, Injector } from '@angular/core';
import { environment } from "src/environments/environment";
import { BaseResourceService } from './base-resource.service';
import { SignInModel, SignUpModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseResourceService<SignInModel>{

  baseApiUrl = `${environment.api}/auth/${environment.version}/user`
  constructor(protected override injector: Injector) {
    super(`${environment.api}/auth/${environment.version}/user`, injector, SignInModel.fromJson)
  }

  signIn(body: SignInModel){
    return this.http.post(`${this.baseApiUrl}/sign-in`, body)
  }

  signUp(body: SignUpModel){
    return this.http.post(`${this.baseApiUrl}/sign-up`, body)
  }

}
