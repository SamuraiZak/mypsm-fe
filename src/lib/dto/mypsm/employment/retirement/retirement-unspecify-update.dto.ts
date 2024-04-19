export interface UnspecifyUpdateDetailDTO {
    updateList: UpdateList[];
}

export interface UpdateList {
    groupId:            number;
    employeeId:         number;
    employeeNumber:     string;
    employeeName:       string;
    identityCardNumber: string;
    retirementTypeId:   number;
    retirementDate:     Date;
}

// Converts JSON strings to/from your types
export class UnspecifyUpdateDetailDTOConvert {
    public static toLetterCertificationDetailDTO(json: string): UnspecifyUpdateDetailDTO {
        return JSON.parse(json);
    }

    public static letterCertificationDetailDTOToJson(value: UnspecifyUpdateDetailDTO): string {
        return JSON.stringify(value);
    }
}