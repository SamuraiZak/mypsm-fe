export interface PostListExamReqeuest {
    examType: string;
}

// Converts JSON strings to/from your types
export class GetListExamReqeuestConvert {
    public static fromResponse(json: string): PostListExamReqeuest {
        return JSON.parse(json);
    }

    public static toJson(value: PostListExamReqeuest): string {
        return JSON.stringify(value);
    }
}
