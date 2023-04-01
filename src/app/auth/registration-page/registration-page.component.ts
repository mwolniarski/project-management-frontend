import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {MessageServiceHelper} from "../../service/messageServiceHelper.service";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {

  // @ts-ignore
  @ViewChild('formModel') registerForm: NgForm;

  isRegisterDone = false;

  constructor(private auth: AuthService, private messageService: MessageServiceHelper) {}

  submit(){
    if(this.registerForm.valid){
      let request = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };

      this.auth.register(request).subscribe(() => {
          this.isRegisterDone = true;
        },
        () => {
          this.messageService.displayMessage('error', 'Error occurred during registration attempt');
        },
        () => {

          this.messageService.displayMessage('success', 'You successfully registered!');
        }
      );;
    }
  }


}
