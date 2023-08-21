import {Component, OnInit} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {EditUserProfilePageComponent} from "./edit-user-profile-page/edit-user-profile-page.component";
import {AuthService} from "../../../../auth/auth.service";
import {User} from "../../../../auth/model/User.model";

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit{

  // @ts-ignore
  user: User | null;

  constructor(private dialogService: DialogService, private authService: AuthService) {
  }

  editUserProfile(){
    const ref = this.dialogService.open(EditUserProfilePageComponent, {
      header: 'Edit user profile',
      width: '80%',
      height: '80%'
    });

    ref.onClose.subscribe();
  }

  ngOnInit(): void {
    this.authService.user.subscribe(user => this.user = user);
  }
}
