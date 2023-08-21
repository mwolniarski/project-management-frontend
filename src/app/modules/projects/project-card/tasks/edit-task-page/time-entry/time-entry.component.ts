import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ProjectService} from "../../../../service/project.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.css']
})
export class TimeEntryComponent {

  // @ts-ignore
  @ViewChild('formModel') formModel: NgForm;

  // @ts-ignore
  @Input() taskId: number;
  // @ts-ignore
  @Input() hoursSpentAlready: number;

  @Output() hoursSpentAlreadyChange = new EventEmitter();
  constructor(private projectService: ProjectService) {}
  submit(){
    let timeEntry = {
      hoursSpent: this.formModel.value.hoursSpent,
      description: this.formModel.value.description,
    }
    this.projectService.addTimeEntry(timeEntry, this.taskId).subscribe(resp =>
      this.hoursSpentAlreadyChange.emit(this.hoursSpentAlready + resp.hoursSpent)
    );
  }
}
