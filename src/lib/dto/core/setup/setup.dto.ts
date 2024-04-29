import type { LookupDTO } from '../lookup/lookup.dto';
import type { UserRoleDTO } from '../user-role/user-role.dto';

export interface ModuleDTO {
    name: string;
    url: string;
    subModules?: ModuleDTO[];
    roles: UserRoleDTO[];
    description?: string;
    icon?: string;
}
