import {OrganizationDetails} from "./OrganizationDetails";
import {PermissionModel} from "../../modules/projects/model/Permission.model";

export interface ProfileDetails {
  profileImage: string;
  firstName: string;
  lastName: string;
  organization: OrganizationDetails;

  permissions: Array<PermissionModel>;
}
