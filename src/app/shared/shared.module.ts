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
import {AppModule} from "../app.module";
import {SidebarItemComponent} from "./components/sidebar/sidebar-item/sidebar-item.component";
import {ProfileDetailsComponent} from "./components/header/profile-details/profile-details.component";
import {SearchBarComponent} from "./components/header/search-bar/search-bar.component";
import {ActivitiesComponent} from "./components/header/activities/activities.component";
import {AuthService} from "../auth/auth.service";



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SidebarItemComponent,
    ProfileDetailsComponent,
    SearchBarComponent,
    ActivitiesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    MenubarModule,
    SidebarModule,
    InputTextModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent
  ],
  providers: [AuthService]
})
export class SharedModule { }
