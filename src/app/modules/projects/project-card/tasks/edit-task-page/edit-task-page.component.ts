import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ProjectService} from "../../../service/project.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {TaskStatus} from "../../../model/TaskStatus.model";
import {TaskPriority} from "../../../model/TaskPriority.model";
import {TaskReadModel} from "../../../model/TaskReadModel.model";
import {TaskWriteModel} from "../../../model/TaskWriteModel.model";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-edit-task-page',
  templateUrl: './edit-task-page.component.html',
  styleUrls: ['./edit-task-page.component.css']
})
export class EditTaskPageComponent implements OnInit{

  // @ts-ignore
  @ViewChild('formModel') addTaskForm: NgForm;
  items = [
    { label: 'Task', icon: 'pi pi-fw pi-wrench'},
    { label: 'History', icon: 'pi pi-fw pi-history'},
    { label: 'Comments', icon: 'pi pi-fw pi-comment'},
    { label: 'Add time entry', icon: 'pi pi-fw pi-stopwatch'}
  ];

  activeItem: MenuItem = this.items[0];
  hoursSpentAlready = 0;

  // @ts-ignore
  public task: TaskWriteModel;

  ngOnInit(): void {
    this.task = {...this.config.data.task};
    this.task.dueDate = new Date(this.task.dueDate);
    this.task.owner =
      {
        id: this.config.data.task.owner.id,
        nick: this.config.data.task.owner.nick,
        fullName: this.config.data.task.owner.firstName + ' ' + this.config.data.task.owner.lastName,
        profileImage: this.config.data.task.owner.profileImage,
        email: this.config.data.task.owner.email
      };

    this.projectService.getTimeEntryForTask(this.config.data.taskId).subscribe(
      timeEntries => this.hoursSpentAlready = timeEntries.reduce((sum, entry) => sum + entry.hoursSpent, 0)
    );
  }
  constructor(private projectService: ProjectService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}
  submit(){
    if(this.addTaskForm.valid){

      const taskId = this.config.data.taskId;

      this.task.status = this.addTaskForm.value.status.name;
      this.task.priority = this.addTaskForm.value.priority.name;
      this.task.owner = {id: this.addTaskForm.value.owner.id};
      this.task.estimatedWorkTime = this.addTaskForm.value.estimatedWorkTime;
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

  getProjectUsers(){
    // @ts-ignore
    return this.config.data.users.map(user => {
      return {
        email: user.email,
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
