import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ProjectService} from "../../../service/project.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {TaskPriority} from "../../../model/TaskPriority.model";
import {ProjectUserRole} from "../../../model/ProjectUserRole.model";

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrls: ['./add-user-page.component.css']
})
export class AddUserPageComponent {


  // @ts-ignore
  @ViewChild('formModel') addUserForm: NgForm;

  constructor(private projectService: ProjectService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}

  submit(){
    if(this.addUserForm.valid){
      const projectId = this.config.data.projectId;

      this.projectService.addUserToProject(projectId, this.addUserForm.value.email, this.addUserForm.value.role.name)
        .subscribe(user => {
          const userModel = {
            role: this.addUserForm.value.role.name,
            email: this.addUserForm.value.email
          };
          this.ref.close(userModel)
        });
    }
  }

  getRoleOptions() {
    return  Object.keys(ProjectUserRole).filter((item) => {
      return isNaN(Number(item));
    }).map(item => {
      return {
        name: item,
      }
    });
  }
}
