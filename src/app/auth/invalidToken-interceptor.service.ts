import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {catchError, Observable, of, tap, throwError} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class InvalidTokenInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if(err.status === 403){
          this.authService.logout()
        }
        return throwError(err);
      })
    );
  }
}
