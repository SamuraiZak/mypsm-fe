export interface AddNewContractEmployeeExperienceDTO {
    experiences: ContractExperience[];
}

export interface ContractExperience {
    company:      string;
    address:      string;
    position:     string;
    positionCode: string;
    startDate:    Date | string;
    endDate:      Date | string;
    salary:       number;
}

// Converts JSON strings to/from your types
export class AddNewContractEmployeeExperienceDTOConvert {
    public static fromJson(json: string): AddNewContractEmployeeExperienceDTO {
        return JSON.parse(json);
    }

    public static toJson(value: AddNewContractEmployeeExperienceDTO): string {
        return JSON.stringify(value);
    }
}