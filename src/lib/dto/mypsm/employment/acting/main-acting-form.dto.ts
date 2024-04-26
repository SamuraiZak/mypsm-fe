export interface CertifySelected {
    id: number[];
}

// Converts JSON strings to/from your types
export class CertifySelectedConvert {
    public static fromJson(json: string): CertifySelected {
        return JSON.parse(json);
    }

    public static toJson(value: CertifySelected): string {
        return JSON.stringify(value);
    }
}

export interface MainMeetingResult {
    id: number;
    status: boolean;
}

// Converts JSON strings to/from your types
export class MainMeetingResultConvert {
    public static fromJson(json: string): MainMeetingResult {
        return JSON.parse(json);
    }

    public static toJson(value: MainMeetingResult): string {
        return JSON.stringify(value);
    }
}

export interface MainActingDetailEdit {
    id:             number;
    actingPosition: string;
    actingGrade:    string;
    newPlacement:   string;
    reportDate:     string;
    supporterName:  string;
    approverName:   string;
}

// Converts JSON strings to/from your types
export class MainActingDetailEditConvert {
    public static fromJson(json: string): MainActingDetailEdit {
        return JSON.parse(json);
    }

    public static toJson(value: MainActingDetailEdit): string {
        return JSON.stringify(value);
    }
}