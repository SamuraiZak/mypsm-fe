export interface RenewContractListResponseDTO {
    contractId:     number;
    candidateName:  string;
    temporaryId:    string;
    identityCardNo: string;
    contractEndDate: string;
    email:          string;
}

// Converts JSON strings to/from your types
export class RenewContractListResponseDTOConvert {
    public static fromJson(json: string): RenewContractListResponseDTO {
        return JSON.parse(json);
    }

    public static toJson(value: RenewContractListResponseDTO): string {
        return JSON.stringify(value);
    }
}
