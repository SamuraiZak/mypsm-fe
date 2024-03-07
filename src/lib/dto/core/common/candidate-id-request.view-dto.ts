export type CandidateIDRequestBody = {
    id: number;
};

// Converts JSON strings to/from your types
export class CandidateIDRequestBodyConvert {
    public static fromJson(json: string): CandidateIDRequestBody {
        return JSON.parse(json);
    }

    public static toJson(value: CandidateIDRequestBody): string {
        return JSON.stringify(value);
    }
}