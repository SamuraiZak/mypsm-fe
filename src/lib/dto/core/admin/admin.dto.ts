export interface EmployeeListFilterDTO {
    program: string;
    employeeNumber: string | null;
    name: string | null;
    identityCard: string | null;
    scheme: string | null;
    grade: string | null;
    position: string | null;
}

export interface ADEmployeeDetailRequestDTO {
    id: number;
}

export interface ADEmployeeDetailDTO {
    employeeId: number;
    employeeNumber: string;
    name: string;
    identityCard: string;
    program: string;
    scheme: string;
    grade: string;
    position: string;
    placement: string;
    roles: ADRoleDTO[];
}

export interface ADRoleDTO {
    id: number;
    code: string;
    description: string;
    userGroupCode: string;
}

export interface ADRolePlusDTO {
    id: number;
    roles: ADRoleDTO[];
}

export interface ADRoleListFilterDTO {
    code: string | null;
    description: string | null;
    userGroupCode: string | null;
}
