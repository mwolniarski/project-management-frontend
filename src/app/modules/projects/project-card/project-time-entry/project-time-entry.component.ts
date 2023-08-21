import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ProjectService} from "../../service/project.service";
import {TaskTimeEntryReadModel} from "../../model/TaskTimeEntryRead.model";
import {BehaviorSubject} from "rxjs";
import {ProjectReadModel} from "../../model/ProjectReadModel.model";

@Component({
  selector: 'app-project-time-entry',
  templateUrl: './project-time-entry.component.html',
  styleUrls: ['./project-time-entry.component.css']
})
export class ProjectTimeEntryComponent implements OnInit{
  timeEntries: Array<TaskTimeEntryReadModel> = [];

  project = new BehaviorSubject<ProjectReadModel | null>(null);
  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.project.subscribe(value => {
      this.projectService.getTimeEntryForProject(this.project.value?.id!)
        .subscribe(entries => this.timeEntries = entries)
    })
  }

  deleteTimeEntry(timeEntryId: number){
    this.projectService.deleteTimeEntry(timeEntryId)
      .subscribe(() => {
        this.timeEntries = this.timeEntries.filter(entry => entry.id != timeEntryId);
      })
  }

  generateTimesheet(){
    this.projectService.generateTimesheet(this.project.value!.id);
  }
}
