export interface AddNewContractEmployeeActivityDTO {
    activities: ContractActivityDTO[];
}

export interface ContractActivityDTO {
    name:        string;
    joinDate:    Date;
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