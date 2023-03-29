import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  // @ts-ignore
  @ViewChild('formModel') loginForm: NgForm;

  constructor(private auth: AuthService) {}

  submit(){
    if(this.loginForm.valid){
      let request = {
        username: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.auth.login(request);
    }
  }
}
