import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from "./default.component";
import {RouterOutlet} from "@angular/router";
import {DashboardComponent} from "../../modules/dashboard/dashboard.component";
import {SharedModule} from "../../shared/shared.module";
import {ProjectsModule} from "../../modules/projects/projects.module";
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {MenubarModule} from "primeng/menubar";
import {InputTextModule} from "primeng/inputtext";
import {CalendarComponent} from "../../modules/calendar/calendar.component";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    CalendarComponent
  ],
  exports: [
    DefaultComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule,
    ProjectsModule,
    SidebarModule,
    ButtonModule,
    MenubarModule,
    InputTextModule,
    HttpClientModule
  ]
})
export class DefaultModule { }
