import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ProjectService} from "../../../../../modules/projects/service/project.service";
import {AuthService} from "../../../../../auth/auth.service";
import {DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-edit-user-profile-page',
  templateUrl: './edit-user-profile-page.component.html',
  styleUrls: ['./edit-user-profile-page.component.css']
})
export class EditUserProfilePageComponent {

  constructor(private authService: AuthService, private dialogRef: DynamicDialogRef) {
  }

  // @ts-ignore
  @ViewChild('formModel') formModel: NgForm;

  submit(event: any){
    console.log(event)
    // if(this.formModel.valid) {
      this.authService.setProfileImage(event.files[0]).subscribe(task => this.dialogRef.close(task));
    // }
  }
}
