export interface EditSupport {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    supportedStatus: string;
    supportedRemark: string;
    supportedDate:   Date;
}
