// To parse this data:
//
//   import { Convert, SalaryAndAllowanceListResponse } from "./file";
//
//   const salaryAndAllowanceListResponse = Convert.toSalaryAndAllowanceListResponse(json);

export interface SalaryAndAllowanceListResponse {
    status:  number;
    message: string;
    data:    SalaryAndAllowanceListResponseData;
}

export interface SalaryAndAllowanceListResponseData {
    pageNum:    number;
    totalData:  number;
    totalPage:  number;
    allowances: SalaryAndAllowanceListResponseAllowance[];
}

export interface SalaryAndAllowanceListResponseAllowance {
    employeeID:      string;
    employeeName:    string;
    baseSalary:      number;
    allowance:       number;
    salaryDeduction: number;
    status:          string;
}

// Converts JSON strings to/from your types
export class SalaryAndAllowanceListResponseConvert {
    public static fromJson(json: string): SalaryAndAllowanceListResponse {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryAndAllowanceListResponse): string {
        return JSON.stringify(value);
    }
}