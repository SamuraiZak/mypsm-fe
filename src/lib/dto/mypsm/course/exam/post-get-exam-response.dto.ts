export interface PostGetExamRequest {
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
    public static toGetExamRequest(json: string): PostGetExamRequest {
        return JSON.parse(json);
    }

    public static getExamRequestToJson(value: PostGetExamRequest): string {
        return JSON.stringify(value);
    }
}
