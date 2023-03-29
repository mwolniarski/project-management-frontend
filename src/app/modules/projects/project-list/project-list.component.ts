import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../service/project.service";
import {SimpleProjectReadModel} from "../model/SimpleProjectReadModel.model";
import {ProjectWriteModel} from "../model/ProjectWriteModel.model";
import {ProjectStatus} from "../model/ProjectStatus.model";
import {DialogService} from "primeng/dynamicdialog";
import {AddProjectPageComponent} from "../add-project-page/add-project-page.component";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  selectedProduct = {};

  projects: Array<SimpleProjectReadModel> = []
  items =
    [
      {
        label: 'Active projects',
        icon: '',
        command: () => {

        }
      }
    ];

  displayedColumns = ["Name", "Owner", "Status", "Progress", "Start date", "End date"];

  constructor(private projectService: ProjectService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  getPercent(allTasks: number, completedTasks: number){
    return Math.trunc(((completedTasks/allTasks)*100));
  }

  openCreateProjectModal(){
    const ref = this.dialogService.open(AddProjectPageComponent, {
      header: 'Add new project',
      width: '90%',
      height: '90%'
    });

    ref.onClose.subscribe(project => this.projects.push(project));
  }
}
