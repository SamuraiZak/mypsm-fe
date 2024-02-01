// ===============================================================
// Auth Reuqest DTO
// ===============================================================

export interface AuthRequestDTO {
    idType:      string;
    userGroup:   string;
    username:    string;
    password:    string;
    currentRole: string;
}

// Converts JSON strings to/from your types
export class AuthRequestConvert {
    public static fromJson(json: string): AuthRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: AuthRequestDTO): string {
        return JSON.stringify(value);
    }
}