import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SimpleProjectReadModel} from "../model/SimpleProjectReadModel.model";
import {ProjectWriteModel} from "../model/ProjectWriteModel.model";
import {ProjectReadModel} from "../model/ProjectReadModel.model";
import {TaskGroupWriteModel} from "../model/TaskGroupWriteModel.model";
import {TaskGroupReadModel} from "../model/TaskGroupReadModel.model";
import {TaskReadModel} from "../model/TaskReadModel.model";
import {TaskWriteModel} from "../model/TaskWriteModel.model";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../../../environments/environment";
import {ProjectUserRole} from "../model/ProjectUserRole.model";
import {CommentModel} from "../model/Comment.model";
import {CommentWriteModel} from "../model/CommentWriteModel.model";
import {ProjectMetaDataModel} from "../model/ProjectMetaDataModel.model";
import {TaskHistoryReadModel} from "../model/TaskHistoryRead.model";
import {TaskTimeEntryWriteModel} from "../model/TaskTimeEntryWrite.model";
import {TaskTimeEntryReadModel} from "../model/TaskTimeEntryRead.model";

@Injectable()
export class ProjectService {
  baseUrl = environment.baseUrl + 'api/';

  project = new BehaviorSubject<ProjectReadModel | null>(null);

  constructor(private httpClient: HttpClient) {}


  getAllProjects(){
    return this.httpClient.get<Array<SimpleProjectReadModel>>(this.getRequestUrl('projects'));
  }

  createProject(project: ProjectWriteModel){
    return this.httpClient.post<SimpleProjectReadModel>(this.getRequestUrl('projects/create'), project);
  }

  getProjectById(projectId: number){
    return this.httpClient.get<ProjectReadModel>(this.getRequestUrl('projects/' + projectId))
  }

  createTaskGroup(taskGroup: TaskGroupWriteModel, projectId: number){
    return this.httpClient.post<TaskGroupReadModel>(this.getRequestUrl('taskGroups/create/'+projectId), taskGroup);
  }

  deleteTaskGroup(taskGroupId: number){
    return this.httpClient.delete(this.getRequestUrl('taskGroups/delete/'+taskGroupId));
  }

  editTaskGroup(taskGroup: TaskGroupWriteModel, taskGroupId: number){
    return this.httpClient.put<TaskGroupReadModel>(this.getRequestUrl('taskGroups/update/' + taskGroupId), taskGroup);
  }

  createTask(task: TaskWriteModel, taskGroupId: number){
    return this.httpClient.post<TaskReadModel>(this.getRequestUrl('tasks/create/'+taskGroupId), task);
  }

  deleteTask(taskId: number){
    return this.httpClient.delete(this.getRequestUrl('tasks/delete/'+taskId));
  }

  editTask(task: TaskWriteModel, taskId: number){
    return this.httpClient.put<TaskReadModel>(this.getRequestUrl('tasks/update/' + taskId), task);
  }

  addUserToProject(projectId: number, email: string, role: ProjectUserRole){
    return this.httpClient.post<any>(this.getRequestUrl('projects/addUser/' + projectId + '?email=' + email + '&role=' + role), '');
  }

  deleteUserFromProject(projectId: number, email: string){
    return this.httpClient.delete<any>(this.getRequestUrl('projects/deleteUser/' + projectId + '?email=' + email));
  }

  getComments(taskId: number){
    return this.httpClient.get<Array<CommentModel>>(this.getRequestUrl('tasks/comments/' + taskId));
  }

  addComments(commentWriteModel: CommentWriteModel){
    return this.httpClient.post<CommentModel>(this.getRequestUrl('comments/create'), commentWriteModel);
  }

  updateComment(commentWriteModel: CommentWriteModel, commentId: number){
    return this.httpClient.put<CommentModel>(this.getRequestUrl('comments/update/' + commentId), commentWriteModel);
  }
  getOverview(projectId: number){
    return this.httpClient.get<ProjectMetaDataModel>(this.getRequestUrl('projects/overview/' + projectId));
  }

  getTaskHistory(taskId: number){
    return this.httpClient.get<Array<TaskHistoryReadModel>>(this.getRequestUrl('tasks/history/' + taskId));
  }

  addTimeEntry(taskTimeEntry: TaskTimeEntryWriteModel, taskId: number){
    return this.httpClient.post<TaskTimeEntryReadModel>(this.getRequestUrl('tasks/timesheet/' + taskId), taskTimeEntry);
  }

  getTimeEntryForTask(taskId: number){
    return this.httpClient.get<Array<TaskTimeEntryReadModel>>(this.getRequestUrl('tasks/timesheet/' + taskId));
  }

  getTimeEntryForProject(projectId: number){
    return this.httpClient.get<Array<TaskTimeEntryReadModel>>(this.getRequestUrl('projects/timesheet/' + projectId));
  }

  deleteTimeEntry(timeEntryId: number){
    return this.httpClient.delete(this.getRequestUrl('tasks/timesheet/' + timeEntryId));
  }

  generateTimesheet(projectId: number){
    this.httpClient.get(this.getRequestUrl('tasks/timesheet/export/' + projectId), {responseType: 'arraybuffer'}).subscribe(resp => {
      let blob = new Blob([resp], { type: "text/csv"});
      let url = window.URL.createObjectURL(blob);
      let pwa = window.open(url);
      console.log(pwa)
      if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
      }
    })
  }

  getRequestUrl(resourceUrl: string){
    return `${this.baseUrl}${resourceUrl}`
  }
}
