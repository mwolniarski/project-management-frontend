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
import {AddTaskgroupPageComponent} from "./project-card/tasks/add-taskgroup-page/add-taskgroup-page.component";
import {AddTaskPageComponent} from "./project-card/tasks/add-task-page/add-task-page.component";
import {DropdownModule} from "primeng/dropdown";
import {EditorModule} from "primeng/editor";
import {EditTaskPageComponent} from "./project-card/tasks/edit-task-page/edit-task-page.component";
import {AddUserPageComponent} from "./project-card/users/add-user-page/add-user-page.component";
import {ChartModule} from "primeng/chart";
import {CardModule} from "primeng/card";
import {CommentsComponent} from "./project-card/tasks/edit-task-page/comments/comments.component";
import {CommentComponent} from "./project-card/tasks/edit-task-page/comments/comment/comment.component";
import {AddCommentComponent} from "./project-card/tasks/edit-task-page/comments/add-comment/add-comment.component";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {DataViewModule} from "primeng/dataview";
import {
  EditCommentsComponent
} from "./project-card/tasks/edit-task-page/comments/edit-comments/edit-comments.component";
import {AuthService} from "../../auth/auth.service";
import {TaskHistoryComponent} from "./project-card/tasks/edit-task-page/task-history/task-history.component";
import {FieldsetModule} from "primeng/fieldset";
import {UserSettingsService} from "../../shared/services/userSettings.service";
import { TimeEntryComponent } from './project-card/tasks/edit-task-page/time-entry/time-entry.component';
import { ProjectTimeEntryComponent } from './project-card/project-time-entry/project-time-entry.component';



@NgModule({
  declarations: [
    ProjectCardComponent,
    ProjectListComponent,
    ProjectsComponent,
    OverviewComponent,
    TasksComponent,
    UsersComponent,
    AddProjectPageComponent,
    AddTaskgroupPageComponent,
    AddTaskPageComponent,
    EditTaskPageComponent,
    AddUserPageComponent,
    CommentsComponent,
    CommentComponent,
    AddCommentComponent,
    EditCommentsComponent,
    TaskHistoryComponent,
    TimeEntryComponent,
    ProjectTimeEntryComponent
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
        InputTextareaModule,
        DropdownModule,
        EditorModule,
        ChartModule,
        CardModule,
        OverlayPanelModule,
        DataViewModule,
        FieldsetModule
    ],
  exports: [
    ProjectCardComponent,
    ProjectListComponent,
    ProjectsComponent
  ],
  providers: [ProjectService, LocalStorageService, DialogService, AuthService, UserSettingsService]
})
export class ProjectsModule { }
