import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ProjectService} from "../service/project.service";
import {DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-add-project-page',
  templateUrl: './add-project-page.component.html',
  styleUrls: ['./add-project-page.component.css']
})
export class AddProjectPageComponent {

  // @ts-ignore
  @ViewChild('formModel') addProjectForm: NgForm;

  constructor(private projectService: ProjectService, public ref: DynamicDialogRef) {}
  submit(){
    if(this.addProjectForm.valid){
      let projectWriteModel = {
        name: this.addProjectForm.value.projectName,
        startTime: this.addProjectForm.value.startDate !== '' ? this.addProjectForm.value.startDate.toISOString().slice(0, 10) : null,
        endTime: this.addProjectForm.value.endDate !== '' ? this.addProjectForm.value.endDate.toISOString().slice(0, 10) : null,
        description: this.addProjectForm.value.description,
      };
      this.projectService.createProject(projectWriteModel).subscribe(project => this.ref.close(project));
    }
  }
}
