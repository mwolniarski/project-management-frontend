import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ProjectService} from "../../../service/project.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-add-taskgroup-page',
  templateUrl: './add-taskgroup-page.component.html',
  styleUrls: ['./add-taskgroup-page.component.css']
})
export class AddTaskgroupPageComponent {

  // @ts-ignore
  @ViewChild('formModel') addTaskGroupForm: NgForm;

  constructor(private projectService: ProjectService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}
  submit(){
    if(this.addTaskGroupForm.valid){

      const projectId = this.config.data.projectId;

      let taskGroup = {
        name: this.addTaskGroupForm.value.name
      };

      if(projectId !== null){
        this.projectService.createTaskGroup(taskGroup, projectId).subscribe(taskGroup => this.ref.close(taskGroup));
      }
    }
  }
}
