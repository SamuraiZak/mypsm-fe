import type { DocumentBase64RequestDTO } from "$lib/dto/core/common/base-64-document-request.dto";
import type { QuarterDocument } from "../../pinjaman/kuarters/application-get-document.dto";

export interface UpdateActingInterview {
    batchId:       number;
    grade:         string;
    position:      string;
    meetingName:   string;
    meetingDate:   string;
    state:         string;
    placement:     string;
    interviewDate: string;
    interviewTime: string;
    documents: DocumentBase64RequestDTO[];
}

// Converts JSON strings to/from your types
export class UpdateActingInterviewConvert {
    public static fromJson(json: string): UpdateActingInterview {
        return JSON.parse(json);
    }

    public static toJson(value: UpdateActingInterview): string {
        return JSON.stringify(value);
    }
}

export interface ActingEmployeeInterviewDetail {
    id:       number;
    document: QuarterDocument[];
}

// Converts JSON strings to/from your types
export class ActingEmployeeInterviewDetailConvert {
    public static fromJson(json: string): ActingEmployeeInterviewDetail {
        return JSON.parse(json);
    }

    public static toJson(value: ActingEmployeeInterviewDetail): string {
        return JSON.stringify(value);
    }
}

export interface ActingEmployeeMeetingDetail {
    grade:        string;
    position:     string;
    date:         Date;
    newPlacement: string;
    document:     QuarterDocument[];
}

// Converts JSON strings to/from your types
export class ActingEmployeeMeetingDetailConvert {
    public static fromJson(json: string): ActingEmployeeInterviewDetail {
        return JSON.parse(json);
    }

    public static toJson(value: ActingEmployeeInterviewDetail): string {
        return JSON.stringify(value);
    }
}

export interface ActingInterviewGeneralDetail {
    meeting:   Meeting;
    interview: Interview;
}

export interface Interview {
    interviewId:   number;
    interviewDate: string;
    interviewTime: string;
    state:         string;
    placement:     string;
}

export interface Meeting {
    meetingId:   number;
    meetingName: string;
    meetingDate: string;
    grade:       string;
    position:    string;
}
