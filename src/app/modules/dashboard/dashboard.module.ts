import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartModule} from "primeng/chart";
import {DashboardComponent} from "./dashboard.component";
import {CardModule} from "primeng/card";
import {ScrollPanelModule} from "primeng/scrollpanel";



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    CardModule,
    ScrollPanelModule
  ],
  exports: [
    DashboardComponent
  ],
  providers: []
})
export class DashboardModule { }
