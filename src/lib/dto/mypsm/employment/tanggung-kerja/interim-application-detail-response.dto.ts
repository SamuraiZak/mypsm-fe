export interface InterimApplicationDetailDTO {
    view?:         View;
    detail?:       Detail;
    duration?:     Duration;
    download?:     Download;
    skipping?:     Skipping;
    support?:      Support;
    verification?: Support;
    checklist?:    Checklist;
}

export interface Checklist {
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

export interface Detail {
    interimId:          number;
    name:               string;
    identityCardNumber: string;
    confirmServiceDate: string;
    positionWithGrade:  string;
    effectiveDate:      Date;
    placement:          string;
}

export interface Download {
    document: Document[];
}

export interface Document {
    document: string;
}

export interface Duration {
    from:            Date;
    to:              Date;
    previousInterim: PreviousInterim[];
}

export interface PreviousInterim {
    from: Date;
    to:   Date;
}

export interface Skipping {
    status: boolean;
    remark: null;
}

export interface Support {
    name:              string;
    remark:            string;
    status:            string;
    statusDescription: string;
}

export interface View {
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