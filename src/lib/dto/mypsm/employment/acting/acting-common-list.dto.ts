export interface ActingCommonList {
    batchId:        number;
    actingType:     string;
    date:           string;
    candidateCount: number;
    status:         string;
}

// Converts JSON strings to/from your types
export class ActingCommonListConvert {
    public static fromJson(json: string): ActingCommonList[] {
        return JSON.parse(json);
    }

    public static toJson(value: ActingCommonList[]): string {
        return JSON.stringify(value);
    }
}