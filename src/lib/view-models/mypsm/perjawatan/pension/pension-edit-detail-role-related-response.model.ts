export interface PensionEditRolesRelatedResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    approverName:  string;
    supporterName: string;
}
