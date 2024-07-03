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

// ===============================================================
export interface NewLoginResponse {
    token: string;
    resetPassword: string;
    currentRole: string;
    currentRoleCode: string;
    roleList: Role[];
}

export interface Role {
    name: string;
    code: string;
}

export class NewLoginResponseConvert {
    public static toNewLoginResponse(json: string): NewLoginResponse {
        return JSON.parse(json);
    }

    public static newLoginResponseToJson(value: NewLoginResponse): string {
        return JSON.stringify(value);
    }
}
