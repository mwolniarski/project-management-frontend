import {ProjectStatus} from "./ProjectStatus.model";

export interface ProjectWriteModel{
  name: string;
  startTime?: Date;
  endTime?: Date;
  description?: string;
}
