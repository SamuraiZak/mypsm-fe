import type { DocumentBase64RequestDTO } from "$lib/dto/core/common/base-64-document-request.dto";

export interface EmployeePostpone {
    id:                  number;
    postponeNeeded:      boolean;
    postponeReason:      string | null;
    requestedPlacement:  string | null;
    requestedReportDate: string | null;
    documents:           DocumentBase64RequestDTO[] | null;
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

export interface PostponeResult {
    actingId:            number;
    postponeNeeded:      boolean;
    postponeReason:      string;
    requestedReportDate: string;
    requestedPlacement:  string;
    meetingResult?:       string;
    postponeApproval?:    string;
    newReportDate?:       string;
}

export interface PostponeDetailResult {
    id:                    number;
    meetingResult:         string;
    newReportDutyDate: string;
    newPlacement:     string;
    approvalLetter:        DocumentBase64RequestDTO[];
}

// Converts JSON strings to/from your types
export class PostponeDetailResultConvert {
    public static fromJson(json: string): PostponeDetailResult {
        return JSON.parse(json);
    }

    public static toJson(value: PostponeDetailResult): string {
        return JSON.stringify(value);
    }
}
