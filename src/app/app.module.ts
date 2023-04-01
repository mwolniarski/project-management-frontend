import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {DefaultModule} from "./layouts/default/default.module";
import {AuthModule} from "./auth/auth.module";
import {AuthService} from "./auth/auth.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {InvalidTokenInterceptorService} from "./auth/invalidToken-interceptor.service";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {MessageServiceHelper} from "./service/messageServiceHelper.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DefaultModule,
    AppRoutingModule,
    AuthModule,
    ToastModule
  ],
  providers: [AuthService, MessageService, MessageServiceHelper,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: InvalidTokenInterceptorService, multi: true}],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
