import {ProjectStatus} from "./ProjectStatus.model";
import {UserReadModel} from "./UserReadModel.model";

export interface SimpleProjectReadModel {
  id: number;
  name: string;
  status: ProjectStatus;

  owner: UserReadModel;
  startTime: Date;
  endTime: Date;
  description: string;
}
