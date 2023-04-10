import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpEvent } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const auth_token: string = this.authService.getToken()
        if (true) {
            return next.handle(
                req.clone({
                    setHeaders: {
                        'Authorization': auth_token,
                        'access-token': auth_token.split('/')[0].split(':')[1],
                        'Content-Type': 'application/json'
                    }
                })
            );
        }
        else {
            return next.handle(req);
        }
        // const authToken: string = this.authService.getToken()
        // let request = req.clone();
        // debugger
        // if (authToken) {
        //     const headers = req.headers
        //     .append('Authorization', `Bearer ${authToken}`)
        //     .append('Accept', 'application/json')
        //     .append('access-token', authToken.split('/')[0].split(':')[1])
        //     .append('client', authToken.split('/')[1].split(':')[1])
        //     .append('expiry', authToken.split('/')[2].split(':')[1])
        //     .append('token-type', authToken.split('/')[3].split(':')[1])
        //     .append('uid', authToken.split('/')[4].split(':')[1])
        //     request = req.clone({ headers });
        // }
        // return next.handle(request);
    }
}
