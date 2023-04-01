import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ProjectReadModel} from "../../model/ProjectReadModel.model";
import {UserReadModel} from "../../model/UserReadModel.model";
import {DialogService} from "primeng/dynamicdialog";
import {AddUserPageComponent} from "./add-user-page/add-user-page.component";
import {ProjectUserRole} from "../../model/ProjectUserRole.model";
import {AuthService} from "../../../../auth/auth.service";
import {ProjectService} from "../../service/project.service";

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

  getLoggedUserForProject(){
    if(this.project.value !== null && this.authService.user.value !== null){
      return this.project.value.users.filter(user => user.email === this.authService.user.value!.email)[0].role;
    }
    return ProjectUserRole.USER;
  }

  userHasWriteRole(){
    return this.getLoggedUserForProject() === ProjectUserRole.ADMIN || this.getLoggedUserForProject() === ProjectUserRole.SUPER_ADMIN;
  }

  deleteUser(email: string){
    const projectId = this.project.value!.id;

    this.projectService.deleteUserFromProject(projectId, email)
      .subscribe(user => this.project.value!.users = this.project.value!.users.filter(user => user.email !== email));
  }
}
