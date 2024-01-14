// To parse this data:
//
//   import { Convert, NewHireListResponse } from "./file";
//
//   const newHireListResponse = Convert.toNewHireListResponse(json);

export interface NewHireListResponse {
    status:  number;
    message: string;
    data:    NewHireListResponseData;
}

export interface NewHireListResponseData {
    pageNum:   number;
    totalData: number;
    totalPage: number;
    newHires:  NewHireData[];
}

export interface NewHireData {
    candidateId:    number;
    candidateName:  string;
    temporaryId:    string;
    identityCardNo: string;
    email:          string;
}

// Converts JSON strings to/from your types
export class NewHireListResponseConvert {
    public static fromJson(json: string): NewHireListResponse {
        return JSON.parse(json);
    }

    public static toJson(value: NewHireListResponse): string {
        return JSON.stringify(value);
    }
}