import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ProjectService} from "../../../service/project.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ProjectUserRole} from "../../../model/ProjectUserRole.model";
import {OrganizationUserReadModel} from "../../../model/UserReadModel.model";
import {UserSettingsService} from "../../../../../shared/services/userSettings.service";

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrls: ['./add-user-page.component.css']
})
export class AddUserPageComponent implements OnInit{


  // @ts-ignore
  @ViewChild('formModel') addUserForm: NgForm;

  // @ts-ignore
  orgUsers: Array<OrganizationUserReadModel>;

  constructor(private projectService: ProjectService, public ref: DynamicDialogRef, public config: DynamicDialogConfig, private userSettings: UserSettingsService) {}

  submit(){
    if(this.addUserForm.valid){
      const projectId = this.config.data.projectId;

      this.projectService.addUserToProject(projectId, this.addUserForm.value.user.email, ProjectUserRole.INTERNAL)
        .subscribe(user => {
          const userModel = {
            role: ProjectUserRole.INTERNAL,
            email: this.addUserForm.value.user.email
          };
          this.ref.close(userModel)
        });
    }
  }

  getOrgUsers(){
    this.userSettings.getOrgUsers().subscribe(users => this.orgUsers = users);
  }

  ngOnInit(): void {
    this.getOrgUsers();
  }
}
