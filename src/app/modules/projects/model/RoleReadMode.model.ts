export interface RoleReadModel {
  id: number;
  name: string;
  permissions: Array<Permission>;
}

export interface Permission {
  name: string;
}
