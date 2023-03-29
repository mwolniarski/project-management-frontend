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
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {SplitButtonModule} from "primeng/splitbutton";
import {TableModule} from "primeng/table";
import {ProgressBarModule} from "primeng/progressbar";
import {TreeTableModule} from "primeng/treetable";
import {ProjectService} from "./service/project.service";
import {LocalStorageService} from "../../auth/localStorage.service";
import {DialogService, DynamicDialogModule} from "primeng/dynamicdialog";
import {AddProjectPageComponent} from "./add-project-page/add-project-page.component";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {CalendarModule} from "primeng/calendar";
import {InputTextareaModule} from "primeng/inputtextarea";



@NgModule({
  declarations: [
    ProjectCardComponent,
    ProjectListComponent,
    ProjectsComponent,
    OverviewComponent,
    TasksComponent,
    UsersComponent,
    AddProjectPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TabMenuModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    TableModule,
    ProgressBarModule,
    TreeTableModule,
    DynamicDialogModule,
    FormsModule,
    InputTextModule,
    RippleModule,
    CalendarModule,
    InputTextareaModule
  ],
  exports: [
    ProjectCardComponent,
    ProjectListComponent,
    ProjectsComponent
  ],
  providers: [ProjectService, LocalStorageService, DialogService]
})
export class ProjectsModule { }
