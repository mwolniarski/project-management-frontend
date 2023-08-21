import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DefaultComponent} from "./layouts/default/default.component";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import {ProjectsComponent} from "./modules/projects/projects.component";
import {ProjectCardComponent} from "./modules/projects/project-card/project-card.component";
import {OverviewComponent} from "./modules/projects/project-card/overview/overview.component";
import {TasksComponent} from "./modules/projects/project-card/tasks/tasks.component";
import {UsersComponent} from "./modules/projects/project-card/users/users.component";
import {ProjectListComponent} from "./modules/projects/project-list/project-list.component";
import {RegistrationPageComponent} from "./auth/registration-page/registration-page.component";
import {LoginPageComponent} from "./auth/login-page/login-page.component";
import {AuthGuard} from "./auth/auth.guard";
import {NotLoggedAuthGuard} from "./auth/notLoggedAuth.guard";
import {CalendarComponent} from "./modules/calendar/calendar.component";
import {
  ConfirmRegisterPageComponent
} from "./auth/registration-page/confirm-register-page/confirm-register-page.component";
import {
  ResetPasswordConfirmationPageComponent
} from "./auth/reset-password-confirmation-page/reset-password-confirmation-page.component";
import {ResetPasswordPageComponent} from "./auth/reset-password-page/reset-password-page.component";
import {
  ProjectTimeEntryComponent
} from "./modules/projects/project-card/project-time-entry/project-time-entry.component";

const routes: Routes = [
  {
    path: 'login',
    canActivate: [NotLoggedAuthGuard],
    component: LoginPageComponent,
  },
  {
    path: 'reset',
    canActivate: [NotLoggedAuthGuard],
    children: [
      {
        path: 'password',
        children: [
          {
            path: '',
            component: ResetPasswordPageComponent
          },
          {
            path: ':token',
            component: ResetPasswordConfirmationPageComponent
          }
        ]
      },
    ]
  },
  {
    path: 'register',
    canActivate: [NotLoggedAuthGuard],
    component: RegistrationPageComponent
  },
  {
    path: 'confirm/:id',
    canActivate: [NotLoggedAuthGuard],
    component: ConfirmRegisterPageComponent
  },
  {
    path: '',
    component: DefaultComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        // component: DashboardComponent
        component: ProjectsComponent
      },
      // {
      //   path: 'calendar',
      //   component: CalendarComponent
      // },
      {
        path: 'projects',
        component: ProjectsComponent,
        children: [
          {
            path: ':id',
            component: ProjectCardComponent,
            children: [
              // {
              //   path: '',
              //   component: OverviewComponent,
              // },
              {
                path: 'tasks',
                component: TasksComponent,
              },
              {
                path: 'users',
                component: UsersComponent,
              },
              {
                path: 'timesheet',
                component: ProjectTimeEntryComponent,
              }
            ]
          },
          {
            path: '',
            component: ProjectListComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
