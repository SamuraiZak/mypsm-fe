export interface EditDirectorCertify {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    directorCertifiedStatus: string;
    directorCertifiedRemark: string;
    directorCertifiedDate:   Date;
}
