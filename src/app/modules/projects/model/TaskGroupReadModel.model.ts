import {TaskReadModel} from "./TaskReadModel.model";

export interface TaskGroupReadModel {
  id: number;
  name: string;
  tasks: Array<TaskReadModel>;
}
