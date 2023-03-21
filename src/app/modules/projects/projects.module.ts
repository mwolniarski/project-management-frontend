import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectCardComponent} from "./project-card/project-card.component";
import {ProjectListComponent} from "./project-list/project-list.component";
import {ProjectsComponent} from "./projects.component";
import {RouterModule} from "@angular/router";
import { OverviewComponent } from './project-card/overview/overview.component';
import { TasksComponent } from './project-card/tasks/tasks.component';
import { UsersComponent } from './project-card/users/users.component';
import {TabMenuModule} from "primeng/tabmenu";



@NgModule({
  declarations: [
    ProjectCardComponent,
    ProjectListComponent,
    ProjectsComponent,
    OverviewComponent,
    TasksComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TabMenuModule
  ],
  exports: [
    ProjectCardComponent,
    ProjectListComponent,
    ProjectsComponent
  ]
})
export class ProjectsModule { }
