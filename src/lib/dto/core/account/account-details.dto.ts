// ===============================================================
// Account Detail DTO
// ===============================================================

export interface AccountDetailDTO {
    fullName: string;
    email: string;
    roles: AccountRole[];
    currentRole: CurrentRoleData;
}

export interface CurrentRoleData {
    code: string;
    description: string;
}

export interface AccountRole {
    code: string;
}

// Converts JSON strings to/from your types
export class AccountDetailConvert {
    public static fromJson(json: string): AccountDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: AccountDetailDTO): string {
        return JSON.stringify(value);
    }
}
