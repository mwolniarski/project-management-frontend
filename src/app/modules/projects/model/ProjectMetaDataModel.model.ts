import {TimesheetMetadata} from "./TimesheetMetadata.model";
import {TaskByPriorityMetadata} from "./TaskByPriorityMetadata.model";

export interface ProjectMetaDataModel {
  numberOfAllTasks: number;
  numberOfCompletedTasks: number;
  taskByPriority: TaskByPriorityMetadata;
  timesheetMetadata: TimesheetMetadata;
}
