// To parse this data:
//
//   import { Convert, AddExamRequest } from "./file";
//
//   const addExamRequest = Convert.toAddExamRequest(json);

export interface PostAddExamRequest {
    examType:     string;
    title:        string;
    startDate:    Date;
    endDate:      Date;
    examDate:     Date;
    examLocation: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static fromJson(json: string): PostAddExamRequest {
        return JSON.parse(json);
    }

    public static toJson(value: PostAddExamRequest): string {
        return JSON.stringify(value);
    }
}
