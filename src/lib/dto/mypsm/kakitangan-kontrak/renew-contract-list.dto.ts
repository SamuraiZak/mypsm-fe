export interface RenewContractListDTO {
    dataType:     number;
    identityCard?: string | null | undefined;
    temporaryId?:  string | null | undefined;
}

// Converts JSON strings to/from your types
export class RenewContractListDTOConvert {
    public static fromJson(json: string): RenewContractListDTO {
        return JSON.parse(json);
    }

    public static toJson(value: RenewContractListDTO): string {
        return JSON.stringify(value);
    }
}