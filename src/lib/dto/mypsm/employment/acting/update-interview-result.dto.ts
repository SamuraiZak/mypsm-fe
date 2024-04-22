export interface UpdateInterviewResult {
    actingIds: number[];
    marks:     number;
}

// Converts JSON strings to/from your types
export class UpdateInterviewResultConvert {
    public static fromJson(json: string): UpdateInterviewResult {
        return JSON.parse(json);
    }

    public static toJson(value: UpdateInterviewResult): string {
        return JSON.stringify(value);
    }
}