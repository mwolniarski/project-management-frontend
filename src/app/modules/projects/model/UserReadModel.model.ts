import {ProjectUserRole} from "./ProjectUserRole.model";
import {RoleReadModel} from "./RoleReadMode.model";

export interface UserReadModel {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: ProjectUserRole;
  profileImage: string;
  nick: string;
}

export interface OrganizationUserReadModel {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: RoleReadModel;
  profileImage: string;
  nick: string;
}
