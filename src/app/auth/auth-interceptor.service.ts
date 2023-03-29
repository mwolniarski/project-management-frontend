import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable, take} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if(user === null){
          return next.handle(req);
        }
        if(user._accessTokenExpirationDate <= new Date()){
          return next.handle(req);
        }
        const modifiedRequest = req.clone({
          setHeaders: {
            'Authorization': 'Bearer ' + user._accessToken
          }
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
