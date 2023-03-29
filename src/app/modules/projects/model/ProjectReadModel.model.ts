import {ProjectStatus} from "./ProjectStatus.model";
import {UserReadModel} from "./UserReadModel.model";
import {TaskGroupReadModel} from "./TaskGroupReadModel.model";

export interface ProjectReadModel{
  id: number;
  name: string;
  status: ProjectStatus;
  startTime: Date;
  endTime: Date;
  description: string;
  owner: UserReadModel;
  users: Array<UserReadModel>;
  taskGroups: Array<TaskGroupReadModel>;
}
