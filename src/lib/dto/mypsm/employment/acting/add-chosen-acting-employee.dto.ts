export interface AddChosenActingEmployeeDTO {
    employeeIds: number[];
    actingType:  string;
    grade: string;
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

export interface UpdateChosenEmployee {
    actingIds:     number[];
    secretaryName: string;
    directorName:  string;
}

// Converts JSON strings to/from your types
export class UpdateChosenEmployeeConvert {
    public static fromJson(json: string): UpdateChosenEmployee {
        return JSON.parse(json);
    }

    public static toJson(value: UpdateChosenEmployee): string {
        return JSON.stringify(value);
    }
}