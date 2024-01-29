export interface EnumDepartmentResponseViewModel {
    status:  number;
    message: string;
    data:    EnumDepartmentResponseData;
}

export interface EnumDepartmentResponseData {
    departments: EnumDepartment[];
}

export interface EnumDepartment {
    id:   number;
    name: string;
}