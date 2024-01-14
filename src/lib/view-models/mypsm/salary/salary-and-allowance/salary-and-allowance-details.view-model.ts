// To parse this data:
//
//   import { Convert, SalaryAndAllowanceDetailResponse } from "./file";
//
//   const salaryAndAllowanceDetailResponse = Convert.toSalaryAndAllowanceDetailResponse(json);

export interface SalaryAndAllowanceDetailResponse {
    status:  number;
    message: string;
    data:    SalaryAndAllowanceDetailResponseData;
}

export interface SalaryAndAllowanceDetailResponseData {
    employeeNo:       string;
    name:             string;
    identityCard:     string;
    grade:            string;
    currentPlacement: string;
    group:            string;
}

// Converts JSON strings to/from your types
export class SalaryAndAllowanceDetailResponseConvert {
    public static fromJson(json: string): SalaryAndAllowanceDetailResponse {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryAndAllowanceDetailResponse): string {
        return JSON.stringify(value);
    }
}
