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
import {environment} from "../../../../environment/environment";

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
    return this.httpClient.delete<TaskReadModel>(this.getRequestUrl('taskGroups/delete/'+taskGroupId));
  }

  createTask(task: TaskWriteModel, taskGroupId: number){
    return this.httpClient.post<TaskReadModel>(this.getRequestUrl('tasks/create/'+taskGroupId), task);
  }

  deleteTask(taskId: number){
    return this.httpClient.delete<TaskReadModel>(this.getRequestUrl('tasks/delete/'+taskId));
  }

  getRequestUrl(resourceUrl: string){
    return `${this.baseUrl}${resourceUrl}`
  }
}
