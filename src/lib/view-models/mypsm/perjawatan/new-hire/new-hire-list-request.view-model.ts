// To parse this data:
//
//   import { Convert, NewHireListRequest } from "./file";
//
//   const newHireListRequest = Convert.toNewHireListRequest(json);

export interface NewHireListRequest {
    pageNum: number;
    pageSize: number;
    orderBy: string;
    orderType: string;
    filter: NewHireListRequestFilter;
}

export interface NewHireListRequestFilter {
    dataType: string;
    identityCard: null;
    staffNo: null;
    staffName: null;
    dateRequest: null;
    dateHire: null;
    status: null;
}

// Converts JSON strings to/from your types
export class NewHireListRequestConvert {
    public static fromJson(json: string): NewHireListRequest {
        return JSON.parse(json);
    }

    public static toJson(value: NewHireListRequest): string {
        return JSON.stringify(value);
    }
}
