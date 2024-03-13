export interface RenewContractAddDTO {
    contractors: Contractor[];
}

export interface Contractor {
    contractId: number;
}

// Converts JSON strings to/from your types
export class RenewContractAddDTOConvert {
    public static fromJson(json: string): RenewContractAddDTO {
        return JSON.parse(json);
    }

    public static toJson(value: RenewContractAddDTO): string {
        return JSON.stringify(value);
    }
}