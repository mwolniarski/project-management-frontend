import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../auth.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-reset-password-confirmation-page',
  templateUrl: './reset-password-confirmation-page.component.html',
  styleUrls: ['./reset-password-confirmation-page.component.css']
})
export class ResetPasswordConfirmationPageComponent{

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) {
  }

  // @ts-ignore
  @ViewChild('resetPasswordForm') resetPasswordForm: NgForm;

  passwordReset = false;

  submit(){
    if(this.resetPasswordForm.value.password1 === this.resetPasswordForm.value.password2){
      this.activatedRoute.url
        .subscribe(urls => {

          const token = urls[0].path;

          this.authService.resetPassword(this.resetPasswordForm.value.password1, token).subscribe(() => this.passwordReset = true)
        })
    }
  }
}
