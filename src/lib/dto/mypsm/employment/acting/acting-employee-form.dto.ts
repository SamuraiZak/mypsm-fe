import type { DocumentBase64RequestDTO } from "$lib/dto/core/common/base-64-document-request.dto";

export interface EmployeePostpone {
    id:                  number;
    postponeNeeded:      boolean;
    postponeReason:      string;
    requestedPlacement:  string;
    requestedReportDate: string;
    documents:           DocumentBase64RequestDTO[];
}

// Converts JSON strings to/from your types
export class EmployeePostponeConvert {
    public static fromJson(json: string): EmployeePostpone {
        return JSON.parse(json);
    }

    public static toJson(value: EmployeePostpone): string {
        return JSON.stringify(value);
    }
}