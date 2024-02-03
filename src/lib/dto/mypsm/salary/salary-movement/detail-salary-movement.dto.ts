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
export class Convert {
    public static toDetailSalaryMovementDTO(json: string): DetailSalaryMovementDTO {
        return JSON.parse(json);
    }

    public static detailSalaryMovementDTOToJson(value: DetailSalaryMovementDTO): string {
        return JSON.stringify(value);
    }
}