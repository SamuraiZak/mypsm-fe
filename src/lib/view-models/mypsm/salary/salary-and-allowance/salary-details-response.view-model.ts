// To parse this data:
//
//   import { Convert, SalaryDetailResponse } from "./file";
//
//   const salaryDetailResponse = Convert.toSalaryDetailResponse(json);

export interface SalaryDetailResponse {
    status:  number;
    message: string;
    data:    SalaryDetailResponseData;
}

export interface SalaryDetailResponseData {
    employeeNo:       string;
    name:             string;
    identityCard:     string;
    grade:            string;
    currentPlacement: string;
    group:            string;
}

// Converts JSON strings to/from your types
export class SalaryDetailResponseConvert {
    public static fromJson(json: string): SalaryDetailResponse {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryDetailResponse): string {
        return JSON.stringify(value);
    }
}
