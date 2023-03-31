import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ProjectReadModel} from "../../model/ProjectReadModel.model";
import {UserReadModel} from "../../model/UserReadModel.model";
import {DialogService} from "primeng/dynamicdialog";
import {AddUserPageComponent} from "./add-user-page/add-user-page.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  project = new BehaviorSubject<ProjectReadModel | null>(null);
  constructor(private dialogService: DialogService) { }


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
}
