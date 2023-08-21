import {Component, ViewChild} from '@angular/core';
import {AuthService} from "../auth.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent {

  // @ts-ignore
  @ViewChild('resetPasswordForm') resetPasswordForm: NgForm;

  verificationSent = false;

  constructor(private authService: AuthService) {
  }
  submit(){
      this.authService.initResetPassword(this.resetPasswordForm.value.email)
        .subscribe(() => this.verificationSent = true);
  }
}
