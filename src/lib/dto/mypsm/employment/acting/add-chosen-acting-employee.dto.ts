export interface AddChosenActingEmployeeDTO {
    employeeIds: number[];
    actingType:  string;
}

// Converts JSON strings to/from your types
export class AddChosenActingEmployeeDTOConvert {
    public static fromResponse(json: string): AddChosenActingEmployeeDTO {
        return JSON.parse(json);
    }

    public static toJson(value: AddChosenActingEmployeeDTO): string {
        return JSON.stringify(value);
    }
}