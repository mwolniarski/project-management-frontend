import {Component, Input, OnInit} from '@angular/core';
import {TaskHistoryReadModel} from "../../../../model/TaskHistoryRead.model";
import {ProjectService} from "../../../../service/project.service";

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.css']
})
export class TaskHistoryComponent implements OnInit{

  constructor(private projectService: ProjectService) {
  }
  // @ts-ignore
  histories: TaskHistoryReadModel[];

  // @ts-ignore
  @Input() taskId: number;
  ngOnInit(): void {
    this.projectService.getTaskHistory(this.taskId).subscribe(histories => this.histories = histories);
  }



}
