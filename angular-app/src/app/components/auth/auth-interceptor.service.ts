import { take, exhaustMap } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {


  constructor(private authService: AuthService) { }

  //middleware for every outgoing http request
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(take(1), exhaustMap(user => {

      //If not logged in
      if (!user) {
        return next.handle(req);
      }

      //If logged in, adding http header 'auth-token', which contains user's token
      const modifiedReq = req.clone({ headers: new HttpHeaders().set('auth-token', user?.userToken!) })
      return next.handle(modifiedReq);
    }));

  }
}
