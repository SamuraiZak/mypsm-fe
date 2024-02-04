export interface DetailSalaryMovementDTO {
    meetingId:           string;
    meetingName:         string;
    meetingDate:         Date;
    salaryMovementMonth: number;
    specialAid:          number;
    specialRaiseType:    string;
    specialRaise:        number;
}


// Converts JSON strings to/from your types
export class DetailSalaryMovementDTOConvert {
    public static fromJson(json: string): DetailSalaryMovementDTO {
        return JSON.parse(json);
    }

    public static toJson(value: DetailSalaryMovementDTO): string {
        return JSON.stringify(value);
    }
}