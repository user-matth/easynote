import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, RouterStateSnapshot,
  CanActivate, Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  user: any[] = []

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkIfAuthenticated()
  }

  private checkIfAuthenticated(){
    if (this.authService.isLoggedIn !== true) {
      this.router.navigate(['sign-in'])
      return false
    }else{
      return true
    }
  }

}