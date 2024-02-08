export interface PostListExamResponse {
    id:                       number;
    examTitle:                string;
    examType:                 string;
    examApplicationOpenDate:  Date;
    examApplicationCloseDate: Date;
    examDate:                 Date;
    examLocation:             string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static fromResponse(json: string): PostListExamResponse {
        return JSON.parse(json);
    }

    public static toJson(value: PostListExamResponse): string {
        return JSON.stringify(value);
    }
}
