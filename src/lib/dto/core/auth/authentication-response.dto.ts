// ===============================================================
// Authentication Request DTO
// ===============================================================

export interface AuthenticationResponseDTO {
    token: string;
}

// Converts JSON strings to/from your types
export class AuthenticationResponseConvert {
    public static fromJson(json: string): AuthenticationResponseDTO {
        return JSON.parse(json);
    }

    public static toJson(value: AuthenticationResponseDTO): string {
        return JSON.stringify(value);
    }
}
