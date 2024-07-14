export interface ContractEmployeeListDTO {
    applicationId: number;
    candidateName:  string;
    temporaryId:    string;
    identityCardNo: string;
    email:          string;
    status:         string;
    remark:         string | null ;
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