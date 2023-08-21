import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ProjectReadModel} from "../../model/ProjectReadModel.model";
import {UserReadModel} from "../../model/UserReadModel.model";
import {DialogService} from "primeng/dynamicdialog";
import {AddUserPageComponent} from "./add-user-page/add-user-page.component";
import {ProjectUserRole} from "../../model/ProjectUserRole.model";
import {AuthService} from "../../../../auth/auth.service";
import {ProjectService} from "../../service/project.service";
import {environment} from "../../../../../environments/environment";
import {PermissionModel} from "../../model/Permission.model";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  project = new BehaviorSubject<ProjectReadModel | null>(null);
  constructor(private dialogService: DialogService, private authService: AuthService, private projectService: ProjectService) { }


  addUser(){
    const ref = this.dialogService.open(AddUserPageComponent, {
      data: {
        projectId: this.project.value!.id
      },
      header: 'Add User',
      width: '80%',
      height: '80%'
    });

    ref.onClose.subscribe(user => {
      this.project.value!.users.push(user);
    });
  }

  getUsers(){
    if(this.project.value !== null){
      return this.project.value.users;
    }
    return [];
  }

  deleteUser(email: string){
    const projectId = this.project.value!.id;

    this.projectService.deleteUserFromProject(projectId, email)
      .subscribe(user => this.project.value!.users = this.project.value!.users.filter(user => user.email !== email));
  }

  canDeleteUserFromProject(){
    return this.authService.userHavePermission(PermissionModel.PROJECT_REMOVE_USER);
  }
}
