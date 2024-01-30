export interface ListGradeActingTypeMainResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    pageNum:   number;
    totalData: number;
    totalPage: number;
    mains:     Main[];
}

export interface Main {
    batchId:        string;
    actingType:     string;
    date:           Date;
    candidateCount: number;
    status:         string;
}