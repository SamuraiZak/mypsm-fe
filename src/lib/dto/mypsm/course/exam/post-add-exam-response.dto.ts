export interface PostAddExamResponse {
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
    public static toPostAddExamResponse(json: string): PostAddExamResponse {
        return JSON.parse(json);
    }

    public static postAddExamResponseToJson(value: PostAddExamResponse): string {
        return JSON.stringify(value);
    }
}
