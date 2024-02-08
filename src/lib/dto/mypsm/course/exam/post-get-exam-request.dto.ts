export interface PostGetExamRequest {
    id: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static fromResponse(json: string): PostGetExamRequest {
        return JSON.parse(json);
    }

    public static toJson(value: PostGetExamRequest): string {
        return JSON.stringify(value);
    }
}
