import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
// import { AuthenticationService } from '../users-authentication/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(/*public authService: AuthenticationService*/) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = null; /*this.authService.getToken();*/
    // console.log(authToken);
    const authReq = request.clone({ setHeaders: {Authorization: 'Bearer ' + authToken}});
    /*const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });*/
    return next.handle(authReq);
  }
}
