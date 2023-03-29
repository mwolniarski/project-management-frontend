import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ProjectReadModel} from "../../model/ProjectReadModel.model";
import {UserReadModel} from "../../model/UserReadModel.model";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<UserReadModel> = [];
  project = new BehaviorSubject<ProjectReadModel | null>(null);
  constructor() { }

  ngOnInit(): void {
    if(this.project.value !== null){
      this.users = this.project.value.users;
    }
  }

}
