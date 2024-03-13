export interface AddContractApproverSupporterDTO {
    candidateId: number;
    supporterId: number;
    approverId:  number;
    isReadonly?: boolean;
}

// Converts JSON strings to/from your types
export class AddContractApproverSupporterDTOConvert {
    public static fromJson(json: string): AddContractApproverSupporterDTO {
        return JSON.parse(json);
    }

    public static toJson(value: AddContractApproverSupporterDTO): string {
        return JSON.stringify(value);
    }
}
