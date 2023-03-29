import {ProjectUserRole} from "./ProjectUserRole.model";

export interface UserReadModel {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: ProjectUserRole;
}
