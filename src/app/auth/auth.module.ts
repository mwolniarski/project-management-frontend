import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegistrationPageComponent} from "./registration-page/registration-page.component";
import {DefaultModule} from "../layouts/default/default.module";
import {AppRoutingModule} from "../app-routing.module";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {StyleClassModule} from "primeng/styleclass";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {AuthService} from "./auth.service";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./auth.guard";
import {LocalStorageService} from "./localStorage.service";
import {NotLoggedAuthGuard} from "./notLoggedAuth.guard";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {MessageModule} from "primeng/message";

@NgModule({
  declarations: [
    LoginPageComponent,
    RegistrationPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DefaultModule,
    AppRoutingModule,
    CheckboxModule,
    InputTextModule,
    RippleModule,
    StyleClassModule,
    ButtonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MessageModule,
    ToastModule
  ],
  providers: [AuthService, AuthGuard, LocalStorageService, NotLoggedAuthGuard, MessageService],
  exports: [],
  bootstrap: []
})
export class AuthModule { }
