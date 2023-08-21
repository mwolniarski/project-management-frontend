import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ProjectService} from "../../../service/project.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {TaskStatus} from "../../../model/TaskStatus.model";
import {TaskPriority} from "../../../model/TaskPriority.model";

@Component({
  selector: 'app-add-task-page',
  templateUrl: './add-task-page.component.html',
  styleUrls: ['./add-task-page.component.css']
})
export class AddTaskPageComponent {

  // @ts-ignore
  @ViewChild('formModel') addTaskForm: NgForm;

  constructor(private projectService: ProjectService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}
  submit(){
    if(this.addTaskForm.valid){

      const taskGroupId = this.config.data.taskGroupId;

      let task = {
        name: this.addTaskForm.value.name,
        status: this.addTaskForm.value.status.name,
        priority: this.addTaskForm.value.priority.name,
        description: this.addTaskForm.value.description,
        dueDate: this.addTaskForm.value.dueDate,
        estimatedWorkTime: this.addTaskForm.value.estimatedWorkTime,
        owner: {id: this.addTaskForm.value.owner.id}
      };
      this.projectService.createTask(task, taskGroupId).subscribe(task => this.ref.close(task));
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

  getProjectUsers(){
    // @ts-ignore
    return this.config.data.users.map(user => {
      return {
        nick: user.nick,
        fullName: user.firstName + " " + user.lastName,
        profileImage: user.profileImage,
        id: user.id
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



