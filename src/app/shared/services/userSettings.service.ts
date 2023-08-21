import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {ProjectReadModel} from "../../modules/projects/model/ProjectReadModel.model";
import {HttpClient} from "@angular/common/http";
import {ProfileDetails} from "../../auth/model/ProfileDetails";
import {OrganizationSettingsModel} from "../model/OrganizationSettings.model";
import {AuthService} from "../../auth/auth.service";
import {OrganizationUserReadModel, UserReadModel} from "../../modules/projects/model/UserReadModel.model";
import {Permission, RoleReadModel} from "../../modules/projects/model/RoleReadMode.model";
import {UserWriteModel} from "../../modules/projects/model/UserWrite.model";
import {RoleWriteModel} from "../model/RoleWrite.model";

@Injectable()
export class UserSettingsService {
  baseUrl = environment.baseUrl + 'api/';

  project = new BehaviorSubject<ProjectReadModel | null>(null);

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  saveOrganizationSettings(organizationSettingsModel: OrganizationSettingsModel){
    const organization = this.authService.user.value?.userDetails.value?.organization;
    return this.httpClient.put<OrganizationSettingsModel>(this.getRequestUrl('organizations/' + organization?.orgId), organizationSettingsModel);
  }

  deleteOrganizationSettings(organizationId: number){
    return this.httpClient.delete<OrganizationSettingsModel>(this.getRequestUrl('organizations/' + organizationId));
  }
  setProfileImage(file: File){
    const formData = new FormData();
    formData.append('image', file);
    return this.httpClient.post<ProfileDetails>(this.getRequestUrl('profile/profile-image'), formData);
  }

  setUserData(userData: {firstName: string, lastName: string}){
    return this.httpClient.post(this.getRequestUrl('profile/profile-details'), userData)
  }


  getOrgUsers(){
    return this.httpClient.get<Array<OrganizationUserReadModel>>(this.getRequestUrl('organizations/users'));
  }

  addUserToOrganization(userWriteModel: UserWriteModel){
    return this.httpClient.post(this.getRequestUrl('organizations/users'), userWriteModel);
  }

  deleteUserFromOrganization(email: string){
    return this.httpClient.delete(this.getRequestUrl('organizations/users?email=' + email));
  }
  getOrganizationRoles(){
    return this.httpClient.get<Array<RoleReadModel>>(this.getRequestUrl('roles'));
  }

  addRoleToOrganization(roleWriteModel: RoleWriteModel){
    return this.httpClient.post<RoleReadModel>(this.getRequestUrl('roles'), roleWriteModel);
  }

  deleteRoleFromOrganization(roleId: number){
    return this.httpClient.delete(this.getRequestUrl('roles/' + roleId));
  }

  getAllPermissions(){
    return this.httpClient.get<Array<Permission>>(this.getRequestUrl('roles/permissions'));
  }

  getRequestUrl(resourceUrl: string){
    return `${this.baseUrl}${resourceUrl}`
  }
}
