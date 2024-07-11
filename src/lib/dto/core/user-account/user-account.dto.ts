import type { ModuleDTO } from '$lib/dto/core/system/system.dto';

export interface AccountDetailsDTO {
    name: string;
    currentRole: string;
    currentRoleCode: string;
    roles: Role[];
    module: ModuleDTO[];
    passwordExpired: boolean;
}

export interface Role {
    id: string;
    name: string;
    code: string;
}

export interface SwitchRoleDTO {
    roleCode: string;
}
