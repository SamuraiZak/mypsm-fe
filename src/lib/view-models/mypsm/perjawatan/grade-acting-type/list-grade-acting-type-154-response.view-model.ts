export interface ListGradeActingType154Response {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    pageNum:   number;
    totalData: number;
    totalPage: number;
    grade154s: Grade154[];
}

export interface Grade154 {
    batchId:        string;
    actingType:     string;
    date:           Date;
    candidateCount: number;
    status:         string;
}
