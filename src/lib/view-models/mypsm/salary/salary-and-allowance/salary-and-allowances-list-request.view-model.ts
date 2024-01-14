// To parse this data:
//
//   import { Convert, SalaryAndAllowanceListRequest } from "./file";
//
//   const salaryAndAllowanceListRequest = Convert.toSalaryAndAllowanceListRequest(json);

export interface SalaryAndAllowanceListRequest {
    pageNum:   number;
    pageSize:  number;
    orderBy:   string;
    orderType: string;
    filter:    SalaryAndAllowanceListRequestFilter;
}

export interface SalaryAndAllowanceListRequestFilter {
}

// Converts JSON strings to/from your types
export class SalaryAndAllowanceListRequestConvert {
    public static fromJson(json: string): SalaryAndAllowanceListRequest {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryAndAllowanceListRequest): string {
        return JSON.stringify(value);
    }
}