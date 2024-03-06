export interface ContractEmployeeListDTO {
    candidateId?:    number;
    candidateName:  string | null;
    temporaryId:    string | null;
    identityCardNo: string | null;
    email?:          string;
}

// Converts JSON strings to/from your types
export class ContractEmployeeListDTOConvert {
    public static fromJson(json: string): ContractEmployeeListDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ContractEmployeeListDTO): string {
        return JSON.stringify(value);
    }
}