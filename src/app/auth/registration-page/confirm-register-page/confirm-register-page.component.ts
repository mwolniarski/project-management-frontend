import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth.service";
import {catchError, map, tap, throwError} from "rxjs";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-confirm-register-page',
  templateUrl: './confirm-register-page.component.html',
  styleUrls: ['./confirm-register-page.component.css']
})
export class ConfirmRegisterPageComponent implements OnInit{

  successfullyRegister = false;

  requestSent = false;

  ngOnInit(): void {
    this.activatedRoute.url
      .subscribe(urls => {
        const registerCode = urls[1].path;
        this.authService.confirmRegistration(registerCode)
          .pipe(
            catchError((err) => {
              // if(err instanceof HttpResponse){
                this.requestSent = true;
              // }
              return throwError(err);
            }),
            tap(resp => {
              this.requestSent = true;
              this.successfullyRegister = true;
              // setTimeout(() => this.router.navigate(['/login']), 2000);
            })
          ).subscribe();
      })
  }

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) {
  }
}
