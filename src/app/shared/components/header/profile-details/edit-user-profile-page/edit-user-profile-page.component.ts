import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {UserSettingsService} from "../../../../services/userSettings.service";
import {AuthService} from "../../../../../auth/auth.service";
import {OrganizationDetails} from "../../../../../auth/model/OrganizationDetails";
import {User} from "../../../../../auth/model/User.model";
import {OrganizationUserReadModel} from "../../../../../modules/projects/model/UserReadModel.model";
import {Permission, RoleReadModel} from "../../../../../modules/projects/model/RoleReadMode.model";

@Component({
  selector: 'app-edit-user-profile-page',
  templateUrl: './edit-user-profile-page.component.html',
  styleUrls: ['./edit-user-profile-page.component.css']
})
export class EditUserProfilePageComponent implements OnInit{

  organizationDetails: OrganizationDetails | undefined;
  items: MenuItem[] | undefined;
  // @ts-ignore
  activeItem: MenuItem;
  // @ts-ignore
  user: User | null;
  // @ts-ignore
  roles: Array<RoleReadModel>;
  // @ts-ignore
  permissions: Array<Permission>;

  // @ts-ignore
  orgUsers: Array<OrganizationUserReadModel>;

  constructor(private confirmationService: ConfirmationService, private userSettingsService: UserSettingsService,
              private authService: AuthService, private dialogRef: DynamicDialogRef, private messageService: MessageService) {
  }

  ngOnInit(){
    this.organizationDetails = this.authService.user.value?.userDetails.value?.organization;

    this.items = [
      {label: 'Profile settings', icon: 'pi pi-sliders-h', title: 'profile'}
    ];

    if(this.organizationDetails){
      this.items.push({label: 'Organization settings', icon: 'pi pi-sitemap', title: 'organization'});
    }
    this.activeItem = this.items[0];

    this.user = this.authService.user.value;

    this.getUsers();

    this.getAllPermissions();

    this.userSettingsService.getOrganizationRoles().subscribe(roles => this.roles = roles);
  }
  // @ts-ignore
  @ViewChild('formModel') formModel: NgForm;
  // @ts-ignore
  @ViewChild('addUser') addUser: NgForm;
  // @ts-ignore
  @ViewChild('addRole') addRole: NgForm;
  // @ts-ignore
  @ViewChild('organizationSettingsForm') organizationSettingsForm: NgForm;

  async submit(event: any){
      await this.userSettingsService.setUserData({firstName:this.formModel.value.userFirstName,  lastName:this.formModel.value.userLastName}).subscribe();
      this.userSettingsService.setProfileImage(event.files[0]).subscribe(userDetails => {
        this.authService.user.value?.userDetails.next(userDetails);
        this.dialogRef.close(userDetails)
      });
  }

  addUserToOrganization(){
    const user = {
      firstName: this.addUser.value.firstName,
      lastName: this.addUser.value.lastName,
      email: this.addUser.value.email,
      roleId: this.addUser.value.role.id
    };
    this.userSettingsService.addUserToOrganization(user).subscribe(
      () => this.getUsers()
    );
  }

  deleteUserFromOrg(email: string){
    this.userSettingsService.deleteUserFromOrganization(email).subscribe(
      () => this.getUsers()
    );
  }

  getUsers(){
    this.userSettingsService.getOrgUsers().subscribe(users => {
      this.orgUsers = users;
    });
  }

  saveOrganizationSettings(){
    const organizationSettings = {
      name: this.organizationSettingsForm.value.orgName
    };

    this.userSettingsService.saveOrganizationSettings(organizationSettings).subscribe();
  }

  deleteOrganization(){
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete your organization?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.userSettingsService.deleteOrganizationSettings(this.organizationDetails?.orgId!)
            .subscribe(() => {
              this.authService.logout();
              this.dialogRef.close();
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Organization deleted'});
            })
        },
        reject: (type: any) => {}
      });
  }

  addRoleToOrganization(){
    const role = {
      name: this.addRole.value.roleName,
      permissions: this.addRole.value.permissions
    };
    this.userSettingsService.addRoleToOrganization(role).subscribe(
      (resp) => this.roles.push(resp)
    );
  }

  deleteRole(roleId: number){
    this.userSettingsService.deleteRoleFromOrganization(roleId)
      .subscribe(() => this.roles = this.roles.filter(role => role.id != roleId))
  }

  getAllPermissions(){
    this.userSettingsService.getAllPermissions()
      .subscribe(resp => this.permissions = resp)
  }

  mapPermissions(role: RoleReadModel){
    return role.permissions.map(perm => perm.name).toString()
  }
}
