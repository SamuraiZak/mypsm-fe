export interface ContractCommonRoleResultDTO {
    id:     number;
    status: boolean;
    remark: string;
    name?: string;
    isReadonly?: boolean;
}

// Converts JSON strings to/from your types
export class ContractCommonRoleResultDTOConvert {
    public static fromJson(json: string): ContractCommonRoleResultDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ContractCommonRoleResultDTO): string {
        return JSON.stringify(value);
    }
}
