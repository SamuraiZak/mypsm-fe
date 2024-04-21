export interface UnspecifyAddDetailDTO {
    groupId:      number;
    employeeList: number[];
}

// Converts JSON strings to/from your types
export class UnspecifyAddDetailDTOConvert {
    public static fromJson(json: string): UnspecifyAddDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: UnspecifyAddDetailDTO): string {
        return JSON.stringify(value);
}
}