import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { AuthenticationService } from '../users-authentication/authentication.service';
import { environment } from 'src/environments/environment';


const BACKEND_URL_DATA = environment;
export interface Auth {
  client_id: string;
  client_secret: string;
}



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const authToken = this.authentication.getToken();
    const authReq = request.clone({
                              setHeaders: {
                                  // Authorization: 'Basic ' + authToken
                                  
                                }
                            });

    return next.handle(authReq);
  }

}
