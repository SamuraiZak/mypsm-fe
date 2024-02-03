// ===============================================================
// Password Update Reuqest DTO
// ===============================================================

export interface PwdUpdateRequestDTO {
    username:    string;
    oldPassword: string;
    newPassword: string;
}

// Converts JSON strings to/from your types
export class PwdUpdateRequestConvert {
    public static fromJson(json: string): PwdUpdateRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: PwdUpdateRequestDTO): string {
        return JSON.stringify(value);
    }
}