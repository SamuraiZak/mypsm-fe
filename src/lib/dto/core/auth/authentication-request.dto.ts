// ===============================================================
// Authentication Request DTO
// ===============================================================

export interface AuthenticationRequestDTO {
    userGroup: string;
    currentRole: string;
    username: string;
    password: string;
}

// Converts JSON strings to/from your types
export class AuthenticationRequestConvert {
    public static fromJson(json: string): AuthenticationRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: AuthenticationRequestDTO): string {
        return JSON.stringify(value);
    }
}
