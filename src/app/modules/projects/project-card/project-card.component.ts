import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectReadModel} from "../model/ProjectReadModel.model";
import {ProjectService} from "../service/project.service";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../../../auth/auth.service";
import {ProjectMetaDataModel} from "../model/ProjectMetaDataModel.model";

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  constructor(private projectService: ProjectService, private activeRoute: ActivatedRoute, private authService: AuthService) { }

  project = new BehaviorSubject<ProjectReadModel | null>(null);

  ngOnInit(): void {
    this.activeRoute.url.subscribe(params => {
      const projectId = Number.parseInt(params[0].path);
      this.projectService.getProjectById(projectId)
        .subscribe(
          resp => {
            this.project.next(resp);
          }
        );
    })
  }
  onOutletLoaded(component: any){
    component.project = this.project;
  }
  items = [
    // {label: 'Overview', icon: 'pi pi-chart-bar', routerLink: '.', routerLinkActiveOptions: {exact: true}},
    {label: 'Tasks', icon: 'pi pi-check-square', routerLink: 'tasks'},
    {label: 'Users', icon: 'pi pi-user', routerLink: 'users'},
    {label: 'Timesheet', icon: 'pi pi-stopwatch', routerLink: 'timesheet'}
  ];
}
