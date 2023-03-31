import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "./auth.service";
import {MessageServiceHelper} from "../service/messageServiceHelper.service";

@Injectable()
export class InvalidTokenInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService, private messageService: MessageServiceHelper) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if(err.status === 403){
          if(this.authService.user.value !== null)
            this.messageService.displayMessage('warn', 'You are not authorized!');
        }
        return throwError(err);
      })
    );
  }
}
