export interface AddNewContractEmployeeActivityDTO {
    activities: ContractActivity[];
    isDraft: boolean;
}

export interface ContractActivity {
    name:        string;
    joinDate:    Date | string;
    position:    string;
    description: string;
}

// Converts JSON strings to/from your types
export class AddNewContractEmployeeActivityDTOConvert {
    public static fromJson(json: string): AddNewContractEmployeeActivityDTO {
        return JSON.parse(json);
    }

    public static toJson(value: AddNewContractEmployeeActivityDTO): string {
        return JSON.stringify(value);
    }
}