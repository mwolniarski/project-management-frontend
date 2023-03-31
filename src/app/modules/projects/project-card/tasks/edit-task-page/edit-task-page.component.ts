import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ProjectService} from "../../../service/project.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {TaskStatus} from "../../../model/TaskStatus.model";
import {TaskPriority} from "../../../model/TaskPriority.model";
import {TaskReadModel} from "../../../model/TaskReadModel.model";
import {TaskWriteModel} from "../../../model/TaskWriteModel.model";

@Component({
  selector: 'app-edit-task-page',
  templateUrl: './edit-task-page.component.html',
  styleUrls: ['./edit-task-page.component.css']
})
export class EditTaskPageComponent implements OnInit{

  // @ts-ignore
  @ViewChild('formModel') addTaskForm: NgForm;

  // @ts-ignore
  public task: TaskWriteModel;

  ngOnInit(): void {
    this.task = {...this.config.data.task};
    this.task.dueDate = new Date(this.task.dueDate);
  }
  constructor(private projectService: ProjectService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}
  submit(){
    if(this.addTaskForm.valid){

      const taskId = this.config.data.taskId;

      this.task.status = this.addTaskForm.value.status.name;
      this.task.priority = this.addTaskForm.value.priority.name;

      this.projectService.editTask(this.task, taskId).subscribe(task => this.ref.close(task));
    }
  }

  getStatusOptions() {
    return  Object.keys(TaskStatus).filter((item) => {
      return isNaN(Number(item));
    }).map(item => {
      return {
        name: item,
      }
    });
  }

  getPriorityOptions() {
    return  Object.keys(TaskPriority).filter((item) => {
      return isNaN(Number(item));
    }).map(item => {
      return {
        name: item,
      }
    });
  }


}
