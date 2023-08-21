import {Permission} from "../../modules/projects/model/RoleReadMode.model";

export interface RoleWriteModel {
  name: string;
  permissions: Array<Permission>;
}
