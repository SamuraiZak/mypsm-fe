export interface AddNewContractEmployeeAcademicDTO {
    academics: ContractAcademic[];
}

export interface ContractAcademic {
    majorId:          number;
    minorId:          number;
    countryId:        number;
    institutionId:    number;
    educationLevelId: number;
    sponsorshipId:    number;
    name:             string;
    completionDate:   Date;
    finalGrade:       string;
    field:            string;
}

// Converts JSON strings to/from your types
export class AddNewContractEmployeeAcademicDTOConvert {
    public static fromJson(json: string): AddNewContractEmployeeAcademicDTO {
        return JSON.parse(json);
    }

    public static toJson(value: AddNewContractEmployeeAcademicDTO): string {
        return JSON.stringify(value);
    }
}