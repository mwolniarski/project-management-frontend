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
    return this.httpClient.post<TaskReadModel>(this.getRequestUrl('projects/addUser/' + projectId + '?email=' + email + '&role=' + role), '');
  }

  getRequestUrl(resourceUrl: string){
    return `${this.baseUrl}${resourceUrl}`
  }
}
