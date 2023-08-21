import {UserReadModel} from "./UserReadModel.model";
import {TaskStatus} from "./TaskStatus.model";
import {TaskPriority} from "./TaskPriority.model";

export interface TaskReadModel {
  id: number;
  name: string;
  status: TaskStatus;
  priority: TaskPriority;
  description: string;
  dueDate: Date;
  owner: UserReadModel;
  estimatedWorkTime: number;
  watchers: Array<UserReadModel>;
}
