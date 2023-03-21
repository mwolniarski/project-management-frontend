import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DefaultComponent} from "./layouts/default/default.component";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import {ProjectsComponent} from "./modules/projects/projects.component";
import {ProjectCardComponent} from "./modules/projects/project-card/project-card.component";
import {OverviewComponent} from "./modules/projects/project-card/overview/overview.component";
import {TasksComponent} from "./modules/projects/project-card/tasks/tasks.component";
import {UsersComponent} from "./modules/projects/project-card/users/users.component";

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [
    {
      path: '',
      component: DashboardComponent
    },
    {
      path: 'projects',
      component: ProjectsComponent,
      children: [
        {
          path: ':id',
          component: ProjectCardComponent,
          children: [
            {
              path: '',
              component: OverviewComponent,
            },
            {
              path: 'tasks',
              component: TasksComponent,
            },
            {
              path: 'users',
              component: UsersComponent,
            }
          ]
        },
        // {
        //   path: '',
        //   component: ProjectListComponent
        // }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
