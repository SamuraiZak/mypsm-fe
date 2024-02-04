export interface APCEmployeeDetailDTO {
    name: string;
    otherName: string;
    identityCard: string;
    identityCardColor: string;
    employeeNo: string;
    race: string;
    religion: string;
    gender: string;
    status: string;
    mobileNo: string;
    isExPolice: boolean;
}

// Converts JSON strings to/from your types
export class APCEmployeeDetailConvert {
    public static fromJson(json: string): APCEmployeeDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: APCEmployeeDetailDTO): string {
        return JSON.stringify(value);
    }
}
