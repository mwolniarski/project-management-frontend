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
import {BadgeModule} from "primeng/badge";
import {TabMenuModule} from "primeng/tabmenu";
import {UserSettingsService} from "./services/userSettings.service";
import {ConfirmDialog, ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {FieldsetModule} from "primeng/fieldset";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {DividerModule} from "primeng/divider";



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
    FormsModule,
    BadgeModule,
    TabMenuModule,
    ConfirmDialogModule,
    FieldsetModule,
    TableModule,
    DropdownModule,
    MultiSelectModule,
    OverlayPanelModule,
    DividerModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent
  ],
  providers: [UserSettingsService, AuthService, ConfirmationService, MessageService]
})
export class SharedModule { }
