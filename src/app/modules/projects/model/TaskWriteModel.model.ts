import {TaskPriority} from "./TaskPriority.model";
import {TaskStatus} from "./TaskStatus.model";

export interface TaskWriteModel {
  name: string;
  status: TaskStatus;
  priority: TaskPriority;
  description: string;
  dueDate: Date;
  owner?: {id: number, nick?: string, fullName?: string, profileImage?: string, email?: string};
  estimatedWorkTime: number;
}
