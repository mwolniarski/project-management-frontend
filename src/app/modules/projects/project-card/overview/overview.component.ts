import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ProjectMetaDataModel} from "../../model/ProjectMetaDataModel.model";
import {ProjectService} from "../../service/project.service";
import {ProjectReadModel} from "../../model/ProjectReadModel.model";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  overview = new BehaviorSubject<ProjectMetaDataModel | null>(null);
  tasksByPriorityData: any;
  allTasksData: any;
  project = new BehaviorSubject<ProjectReadModel | null>(null);
  options: any;

  ngOnInit() {
    this.project.subscribe(() => {
      this.projectService.getOverview(this.project.value!.id).subscribe(overview => this.overview.next(overview));
    });

    this.overview.subscribe(() => {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      let priority = this.overview.value?.taskByPriority;
      this.tasksByPriorityData = {
        labels: ['LOW', 'NORMAL', 'HIGH', 'URGENT'],
        datasets: [
          {
            data: [priority?.numberOfTasksWithLowPriority, priority?.numberOfTasksWithNormalPriority, priority?.numberOfTasksWithHighPriority, priority?.numberOfTasksWithUrgentPriority],
            backgroundColor: [documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--orange-500'), documentStyle.getPropertyValue('--red-400')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--orange-500'), documentStyle.getPropertyValue('--red-400')]
          }
        ]
      };

      let tasks = this.overview.value;
      this.allTasksData = {
        labels: ['Completed', 'Uncompleted'],
        datasets: [
          {
            data: [tasks?.numberOfCompletedTasks, (tasks!.numberOfAllTasks-tasks!.numberOfCompletedTasks)],
            backgroundColor: [documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')]
          }
        ]
      };

      this.options = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        }
      };
    })
  }
}
