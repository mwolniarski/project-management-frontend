import { Component } from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {EditUserProfilePageComponent} from "./edit-user-profile-page/edit-user-profile-page.component";

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent {

  constructor(private dialogService: DialogService) {
  }

  editUserProfile(){
    const ref = this.dialogService.open(EditUserProfilePageComponent, {
      header: 'Edit user profile',
      width: '80%',
      height: '80%'
    });

    ref.onClose.subscribe();
  }
}
