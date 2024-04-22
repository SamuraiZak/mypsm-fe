export interface InterimApplicationDetailDTO {
    applicationDetail:         InterimApplicationDetail;
    employeeDetail:            InterimEmployeeDetail;
    duration:                  InterimDuration;
    download:                  InterimDownload;
    skipping:                  InterimSkipping;
    support:                   InterimSupport;
    approval:                  InterimSupport;
    verification:              InterimSupport;
    checklist:                 InterimChecklist;
}

export interface InterimChecklist {
    interimId:                 number;
    preparer:                  string;
    checker:                   string;
    applicationLetterStatus:   boolean;
    certifiedFormStatus:       boolean;
    organisationalChartStatus: boolean;
    jobDescriptionStatus:      boolean;
    orderLetterStatus:         boolean;
    leaveStatementStatus:      boolean;
    documentListStatus:        boolean;
    justificationStatus:       boolean;
    applicationLetterCheck:    boolean;
    certifiedFormCheck:        boolean;
    organisationalChartCheck:  boolean;
    jobDescriptionCheck:       boolean;
    orderLetterCheck:          boolean;
    leaveStatementCheck:       boolean;
    documentListCheck:         boolean;
    justificationCheck:        boolean;
}

export interface InterimEmployeeDetail {
    interimId:          number;
    name:               string;
    identityCardNumber: string;
    confirmDate:        string;
    serviceDate:        string;
    positionWithGrade:  string;
    effectiveDate:      string;
    placement:          string;
}

export interface InterimDownload {
    document: InterimDocument[];
}

export interface InterimDocument {
    name: string;
    document: string;
}

export interface InterimDuration {
    from:            string;
    to:              string;
    previousInterim: PreviousInterim[];
}

export interface PreviousInterim {
    from: string;
    to:   string;
}

export interface InterimSkipping {
    status: boolean;
    remark: string;
}

export interface InterimSupport {
    name:              string;
    remark:            string;
    status?:            string;
    statusCode?:            string;
    statusDescription: string;
}

export interface InterimApplicationDetail {
    interimId:       number;
    grade:           number;
    position:        number;
    placement:       number;
    newPlacement:    number;
    referenceNumber: string;
    startDate:       string;
    endDate:         string;
    reason:          string;
}

// Converts JSON strings to/from your types
export class InterimApplicationDetailDTOConvert {
    public static fromJson(json: string): InterimApplicationDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: InterimApplicationDetailDTO): string {
        return JSON.stringify(value);
    }
}
export class InterimChecklistConvert {
    public static fromJson(json: string): InterimChecklist {
        return JSON.parse(json);
    }

    public static toJson(value: InterimChecklist): string {
        return JSON.stringify(value);
    }
}