export interface PensionDetailRolesRelatedResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    process: Process;
}

export interface Process {
    supporterName:   string;
    supportedStatus: string;
    supportedRemark: string;
    supportedDate:   Date;
    approverName:    string;
    approvedStatus:  string;
    approvedRemark:  string;
    approvedDate:    Date;
}
