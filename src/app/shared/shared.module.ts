import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {HeaderComponent} from "./components/header/header.component";
import {RouterModule} from "@angular/router";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {SplitButtonModule} from "primeng/splitbutton";
import {MenubarModule} from "primeng/menubar";
import {SidebarModule} from "primeng/sidebar";
import {InputTextModule} from "primeng/inputtext";
import {SidebarItemComponent} from "./components/sidebar/sidebar-item/sidebar-item.component";
import {ProfileDetailsComponent} from "./components/header/profile-details/profile-details.component";
import {SearchBarComponent} from "./components/header/search-bar/search-bar.component";
import {ActivitiesComponent} from "./components/header/activities/activities.component";
import {AuthService} from "../auth/auth.service";
import {
  EditUserProfilePageComponent
} from "./components/header/profile-details/edit-user-profile-page/edit-user-profile-page.component";
import {FileUploadModule} from "primeng/fileupload";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SidebarItemComponent,
    ProfileDetailsComponent,
    SearchBarComponent,
    ActivitiesComponent,
    EditUserProfilePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    MenubarModule,
    SidebarModule,
    InputTextModule,
    FileUploadModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent
  ],
  providers: [AuthService]
})
export class SharedModule { }
