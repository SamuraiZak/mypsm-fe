export interface AddSalaryMovementRequestDTO {
    meetingName:         string;
    meetingDate:         Date;
    salaryMovementMonth: number;
    specialAid:          number;
    specialRaiseType:    string;
    specialRaise:        number;
    employees:           EmployeeSalaryMovementID[];
}

export interface EmployeeSalaryMovementID {
    employeeId: number;
}

// Converts JSON strings to/from your types
export class AddSalaryMovementRequestDTOConvert {
    public static toAddSalaryMovementDTO(json: string): AddSalaryMovementRequestDTO {
        return JSON.parse(json);
    }

    public static addSalaryMovementDTOToJson(value: AddSalaryMovementRequestDTO): string {
        return JSON.stringify(value);
    }
}
