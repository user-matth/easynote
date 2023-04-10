import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  public href: string = "";
  logedIn: boolean = false
  reload = true

  constructor(
    private router: Router,
    private authService: AuthService
  ) {  }

  ngOnInit() {
    this.href = this.router.url;
    // console.log(this.router.url);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse){
          if (error.error instanceof ErrorEvent) {
            // console.log('Error Event');
          } else {
            switch (error.status) {
              case 0: // Api não está respondendo
                console.log(`Api não está respondendo \n ${error.url ? error.url : 'contate o administrador!'}`, 'Erro')
                break
              case 401: // Unauthorized Error 
                localStorage.clear()
                console.log(error.error.errors[0].message, 'Erro')
                // window.location.reload()
                break
              case 403: // Forbidden
              console.log(error.error.errors[0].message + `\n ${error.url}`, 'Erro')
                break
              case 404: // Not found
                console.log(error.error.errors[0], 'Erro')
                // console.log(error.error.errors[0] + `\n ${error.url}`, 'Erro')
                break
              case 422: // Error entity
                console.log(error.error.errors[0].message + `\n ${error.url}`, 'Erro')
                break
              case 503: // Server error
                console.log('Erro no Servidor', 'Erro')
                localStorage.clear()
                window.location.reload()
                break
            }
          }
        } else {
          console.log('Erro desconhecido');
        }
        return throwError(() => new Error(''));
      })
    );
  }
}
