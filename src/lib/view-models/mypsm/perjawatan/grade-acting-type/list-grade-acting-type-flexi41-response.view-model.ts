export interface ListGradeActingTypeFlexi41 {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    pageNum:   number;
    totalData: number;
    totalPage: number;
    flexi41s:  Flexi41[];
}

export interface Flexi41 {
    batchId:        string;
    actingType:     string;
    date:           Date;
    candidateCount: number;
    status:         string;
}